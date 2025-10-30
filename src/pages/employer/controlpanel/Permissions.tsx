function Permissions() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Permission Settings</h3>
      <ul className="space-y-3">
        <li className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <span>Manage Users</span>
          <input type="checkbox" defaultChecked className="w-5 h-5" />
        </li>
        <li className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <span>View Reports</span>
          <input type="checkbox" className="w-5 h-5" />
        </li>
        <li className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <span>Access System Logs</span>
          <input type="checkbox" defaultChecked className="w-5 h-5" />
        </li>
      </ul>
    </div>
  );
}

export default Permissions;
