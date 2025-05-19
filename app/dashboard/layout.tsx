import MenuBar from "../../src/components/include/menu";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row p-[5%] bg-[#FAF1F1] h-screen overflow-hidden relative">
        {/* Blobs en fond */}           
        <div className="absolute -top-15 -right-10 w-96 h-96 bg-[#88CDFF] rounded-full blur-3xl opacity-70 z-0"></div>
        <div className="absolute -bottom-15 -left-10 w-96 h-96 bg-[#77FFB2] rounded-full blur-3xl opacity-70 z-0"></div>

        <MenuBar />
        <main className="flex-1 overflow-y-auto">
            {children}
        </main>
    </div>
  );
}
