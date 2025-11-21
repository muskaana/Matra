import { useState } from 'react';
import { useLocation } from 'wouter';
import { FlowErrorBoundary } from '@/components/FlowErrorBoundary';
import { PlayCircle, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

interface FlowStep {
  type: 'click' | 'navigate' | 'wait';
  testId?: string;
  href?: string;
  description: string;
  delay?: number;
}

interface Flow {
  id: string;
  name: string;
  steps: FlowStep[];
  expectedEndPath?: string;
  expectedEndTestId?: string;
}

// Define main user flows
const flows: Flow[] = [
  {
    id: 'landing-to-vowels-quiz',
    name: 'Landing → Script → Level 1 → Vowels Quiz',
    steps: [
      { type: 'navigate', href: '/', description: 'Navigate to landing page' },
      { type: 'wait', delay: 500, description: 'Wait for page load' },
      { type: 'click', testId: 'button-start', description: 'Click Start Learning button' },
      { type: 'wait', delay: 500, description: 'Wait for Script page' },
      { type: 'navigate', href: '/script/lesson/vowels/1', description: 'Navigate to Vowels section' },
      { type: 'wait', delay: 500, description: 'Wait for Vowels page' },
      { type: 'click', testId: 'button-start-quiz', description: 'Click Start Quiz button' },
      { type: 'wait', delay: 500, description: 'Wait for quiz page' },
    ],
    expectedEndPath: '/script/quiz/vowels/1a',
  },
  {
    id: 'landing-to-beginner-words',
    name: 'Landing → Script → Beginner Words → Quiz',
    steps: [
      { type: 'navigate', href: '/', description: 'Navigate to landing page' },
      { type: 'wait', delay: 500, description: 'Wait for page load' },
      { type: 'click', testId: 'button-start', description: 'Click Start Learning button' },
      { type: 'wait', delay: 500, description: 'Wait for Script page' },
      { type: 'navigate', href: '/words/beginner', description: 'Navigate to Beginner Words' },
      { type: 'wait', delay: 500, description: 'Wait for Words page' },
    ],
    expectedEndPath: '/words/beginner',
  },
  {
    id: 'landing-to-read-story',
    name: 'Landing → Read Tab → First Story',
    steps: [
      { type: 'navigate', href: '/', description: 'Navigate to landing page' },
      { type: 'wait', delay: 500, description: 'Wait for page load' },
      { type: 'click', testId: 'button-start', description: 'Click Start Learning button' },
      { type: 'wait', delay: 500, description: 'Wait for Script page' },
      { type: 'click', testId: 'nav-read', description: 'Click Read tab' },
      { type: 'wait', delay: 500, description: 'Wait for Read page' },
      { type: 'click', testId: 'card-reading-whatsapp-1', description: 'Click first story card' },
      { type: 'wait', delay: 500, description: 'Wait for story page' },
    ],
    expectedEndPath: '/reading/whatsapp-1',
  },
  {
    id: 'landing-to-talk',
    name: 'Landing → Talk Tab → First Conversation',
    steps: [
      { type: 'navigate', href: '/', description: 'Navigate to landing page' },
      { type: 'wait', delay: 500, description: 'Wait for page load' },
      { type: 'click', testId: 'button-start', description: 'Click Start Learning button' },
      { type: 'wait', delay: 500, description: 'Wait for Script page' },
      { type: 'click', testId: 'nav-talk', description: 'Click Talk tab' },
      { type: 'wait', delay: 500, description: 'Wait for Talk page' },
    ],
    expectedEndPath: '/words/beginner',
  },
];

interface FlowResult {
  flowId: string;
  status: 'idle' | 'running' | 'success' | 'error';
  error?: string;
  currentStep?: number;
}

export default function FlowCheckerPage() {
  const [location, setLocation] = useLocation();
  const [results, setResults] = useState<Record<string, FlowResult>>(
    flows.reduce((acc, flow) => ({
      ...acc,
      [flow.id]: { flowId: flow.id, status: 'idle' }
    }), {})
  );
  const [isRunningAll, setIsRunningAll] = useState(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const executeFlow = async (flow: Flow) => {
    setResults(prev => ({
      ...prev,
      [flow.id]: { flowId: flow.id, status: 'running', currentStep: 0 }
    }));

    try {
      for (let i = 0; i < flow.steps.length; i++) {
        const step = flow.steps[i];
        
        setResults(prev => ({
          ...prev,
          [flow.id]: { ...prev[flow.id], currentStep: i }
        }));

        if (step.type === 'navigate' && step.href) {
          setLocation(step.href);
          await sleep(step.delay || 300);
        } else if (step.type === 'click' && step.testId) {
          await sleep(200); // Wait for render
          const element = document.querySelector(`[data-testid="${step.testId}"]`) as HTMLElement;
          if (!element) {
            throw new Error(`Element with testId "${step.testId}" not found`);
          }
          element.click();
          await sleep(step.delay || 300);
        } else if (step.type === 'wait') {
          await sleep(step.delay || 500);
        }
      }

      // Verify end state
      if (flow.expectedEndPath && location !== flow.expectedEndPath) {
        throw new Error(`Expected to end at ${flow.expectedEndPath}, but at ${location}`);
      }

      setResults(prev => ({
        ...prev,
        [flow.id]: { flowId: flow.id, status: 'success' }
      }));
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [flow.id]: { 
          flowId: flow.id, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
      }));
    }
  };

  const runAllFlows = async () => {
    setIsRunningAll(true);
    for (const flow of flows) {
      await executeFlow(flow);
      await sleep(1000); // Pause between flows
    }
    setIsRunningAll(false);
  };

  const runSingleFlow = async (flow: Flow) => {
    await executeFlow(flow);
  };

  const getStatusIcon = (status: FlowResult['status']) => {
    switch (status) {
      case 'idle':
        return <div className="w-6 h-6 rounded-full border-2 border-gray-300" />;
      case 'running':
        return <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-yellow-700 font-semibold">
            🛠️ Development Only - Flow Checker
          </p>
          <p className="text-yellow-600 text-sm mt-1">
            This page tests critical user flows to ensure they don't crash.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Flow Checker</h1>
            <button
              onClick={runAllFlows}
              disabled={isRunningAll}
              className="flex items-center gap-2 bg-[#ff9930] text-white px-4 py-2 rounded-lg hover:bg-[#CF7B24] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              data-testid="button-run-all"
            >
              <PlayCircle className="w-5 h-5" />
              {isRunningAll ? 'Running...' : 'Run All Flows'}
            </button>
          </div>

          <div className="space-y-4">
            {flows.map((flow) => {
              const result = results[flow.id];
              return (
                <FlowErrorBoundary key={flow.id} flowName={flow.name}>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(result.status)}
                        <div>
                          <h3 className="font-semibold text-gray-800">{flow.name}</h3>
                          {result.status === 'running' && result.currentStep !== undefined && (
                            <p className="text-sm text-gray-500">
                              Step {result.currentStep + 1}/{flow.steps.length}: {flow.steps[result.currentStep]?.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => runSingleFlow(flow)}
                        disabled={result.status === 'running' || isRunningAll}
                        className="text-[#ff9930] hover:text-[#CF7B24] disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        data-testid={`button-run-${flow.id}`}
                      >
                        Run
                      </button>
                    </div>

                    {result.status === 'error' && result.error && (
                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                        ❌ {result.error}
                      </div>
                    )}

                    {result.status === 'success' && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                        ✅ Flow completed successfully
                      </div>
                    )}

                    <details className="mt-3">
                      <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                        View Steps ({flow.steps.length})
                      </summary>
                      <ul className="mt-2 space-y-1 pl-4">
                        {flow.steps.map((step, idx) => (
                          <li key={idx} className={`text-xs text-gray-600 ${result.currentStep === idx ? 'font-bold text-blue-600' : ''}`}>
                            {idx + 1}. {step.description}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </FlowErrorBoundary>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Current Location</h2>
          <p className="text-sm text-gray-600 font-mono">{location}</p>
        </div>
      </div>
    </div>
  );
}
