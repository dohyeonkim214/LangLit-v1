import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  ...props
}) => {
  return (
    <button
      className={`
        px-4 py-2 rounded-md font-medium transition-colors
        ${
          variant === 'primary'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }
      `}
      {...props}
    >
      {children}
    </button>
  );
};

function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[90%] max-w-[600px] bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">
            English Literacy Assessment
          </h1>
          <p className="text-gray-600">
            For CJK Heritage Students in North America
          </p>
        </div>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-medium">What to Expect:</h3>
            <ul className="text-sm text-gray-600">
              <li>15 Questions</li>
              <li>About 20 Minutes</li>
              <li>Reading and Understanding</li>
            </ul>
          </div>

          <div className="text-center">
            <Button variant="primary" onClick={() => window.location.href = '/assessment'}>
              Start Assessment
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500">
            Your results will help us understand your English literacy level
          </p>
          
          {/* Pricing Section */}
          <div className="text-center mt-8">
            <h3 className="font-medium text-lg">Pricing</h3>
            <p className="text-gray-600 mt-2">Choose the plan that works best for you</p>
            <div className="space-y-4 mt-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="text-gray-800 font-semibold">Monthly</h4>
                <p className="text-gray-600">$12 per month</p>
                <Button variant="primary" onClick={() => window.location.href = '/subscribe?plan=monthly'}>
                  Subscribe Monthly
                </Button>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="text-gray-800 font-semibold">Yearly</h4>
                <p className="text-gray-600">$60 per year (Save 50%)</p>
                <Button variant="secondary" onClick={() => window.location.href = '/subscribe?plan=yearly'}>
                  Subscribe Yearly
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;