const Header = () => (
  <header className="bg-white border-b px-4 py-3">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <h1 className="text-lg font-semibold">Dashboard</h1>
    </div>
  </header>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar (fallback inline to avoid module import error) */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">

  <div className="px-6 py-8 border-b">

    <h1 className="text-3xl font-extrabold tracking-tight">
      Services
    </h1>

    <p className="text-sm text-gray-500 mt-1">
      Admin Panel
    </p>

  </div>


  <nav className="flex-1 px-4 py-6 space-y-2">

    <a
      href="/dashboard"
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition font-medium"
    >
      📊 Dashboard
    </a>

    <a
      href="/customers"
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition font-medium"
    >
      👥 Customers
    </a>

    <a
      href="/services"
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition font-medium"
    >
      🛠 Services
    </a>

    <a
      href="/bookings"
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition font-medium"
    >
      📅 Bookings
    </a>

    <a
      href="/technicians"
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition font-medium"
    >
      👨‍🔧 Technicians
    </a>

  </nav>


  <div className="border-t p-5">

    <button
      className="w-full bg-black text-white rounded-xl py-3 hover:bg-gray-800 transition"
    >
      Logout
    </button>

  </div>

</aside>
      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>

      </div>

    </div>
  );
}