export default function SysSettings() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">System Settings</h3>
      <form className="space-y-4 max-w-lg">
        <div>
          <label className="block text-gray-600 mb-1">System Name</label>
          <input
            type="text"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            defaultValue="Clear Trust Platform"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Support Email</label>
          <input
            type="email"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            defaultValue="support@cleartrust.com"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}

;
