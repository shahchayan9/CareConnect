import React from 'react';

function StatsCard({ title, value, icon, change }) {
  const isPositive = change > 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-3 rounded-md bg-gray-50">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={`px-5 py-2 ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
        <div className="text-sm">
          <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-gray-500 ml-1">
            vs. last month
          </span>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
