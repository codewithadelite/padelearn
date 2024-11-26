import Image from "next/image";
import { AudioWaveform } from "lucide-react";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-emerald-700 text-sidebar-primary-foreground">
          <AudioWaveform className="size-4" />
        </div>
      </div>
    </div>
  );
}
