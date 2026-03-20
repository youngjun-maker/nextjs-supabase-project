"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface InviteCodeCopyProps {
  inviteCode: string;
}

export function InviteCodeCopy({ inviteCode }: InviteCodeCopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    toast.success("초대 코드가 복사되었습니다");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
      <span className="flex-1 font-mono text-sm tracking-widest">{inviteCode}</span>
      <Button variant="ghost" size="icon" onClick={handleCopy} aria-label="초대 코드 복사">
        {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
      </Button>
    </div>
  );
}
