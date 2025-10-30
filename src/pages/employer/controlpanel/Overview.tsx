function Overview() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">System Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 text-blue-700 p-4 rounded-md">
          <h4 className="font-semibold text-lg">Active Users</h4>
          <p className="text-2xl font-bold">142</p>
        </div>
        <div className="bg-green-100 text-green-700 p-4 rounded-md">
          <h4 className="font-semibold text-lg">Permissions Set</h4>
          <p className="text-2xl font-bold">36</p>
        </div>
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
          <h4 className="font-semibold text-lg">System Logs</h4>
          <p className="text-2xl font-bold">412</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
