function UserManagement() {
  const users = [
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "Editor" },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">User Management</h3>
      <table className="w-full border-collapse rounded-md">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3 text-right">
                <button className="text-blue-600 hover:underline mr-3">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
