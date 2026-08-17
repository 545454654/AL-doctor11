import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, Grid, User } from 'lucide-react';

interface CallScreenProps {
  phoneNumber: string;
  contactName?: string;
  onEndCall: () => void;
}

export const CallScreen: React.FC<CallScreenProps> = ({
  phoneNumber,
  contactName,
  onEndCall,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [callState, setCallState] = useState<'calling' | 'connected'>('calling');

  useEffect(() => {
    // Connect after 2.5s
    const connectTimer = setTimeout(() => {
      setCallState('connected');
    }, 2500);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (callState !== 'connected') return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callState]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-zinc-800 to-zinc-950 text-white flex flex-col justify-between p-8 select-none animate-in fade-in duration-200">
      {/* Top Details */}
      <div className="flex flex-col items-center pt-8 text-center">
        <div className="w-24 h-24 rounded-full bg-zinc-700/80 border-2 border-zinc-600 flex items-center justify-center text-3xl font-bold mb-4 shadow-xl">
          {contactName ? contactName.charAt(0) : <User className="w-12 h-12 text-zinc-400" />}
        </div>

        <h2 className="text-2xl font-bold text-white mb-1">
          {contactName || phoneNumber}
        </h2>
        <p className="text-sm font-mono text-zinc-400 dir-ltr mb-2">{phoneNumber}</p>

        <span className="text-xs px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-300 font-medium">
          {callState === 'calling' ? 'جاري الاتصال...' : formatTimer(seconds)}
        </span>
      </div>

      {/* Control Buttons Grid */}
      <div className="w-full max-w-xs mx-auto space-y-8">
        <div className="grid grid-cols-3 gap-6 text-center">
          {/* Mute */}
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="flex flex-col items-center gap-1.5"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isMuted ? 'bg-white text-zinc-900' : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </div>
            <span className="text-[11px] text-zinc-300 font-medium">كتم الصوت</span>
          </button>

          {/* Keypad */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-14 h-14 rounded-full bg-zinc-800 text-white flex items-center justify-center">
              <Grid className="w-6 h-6" />
            </div>
            <span className="text-[11px] text-zinc-300 font-medium">لوحة المفاتيح</span>
          </div>

          {/* Speaker */}
          <button
            type="button"
            onClick={() => setIsSpeaker(!isSpeaker)}
            className="flex flex-col items-center gap-1.5"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isSpeaker ? 'bg-white text-zinc-900' : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
            >
              {isSpeaker ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </div>
            <span className="text-[11px] text-zinc-300 font-medium">مكبر الصوت</span>
          </button>
        </div>

        {/* End Call Button */}
        <div className="flex justify-center pt-4">
          <button
            type="button"
            id="btn-end-call"
            onClick={onEndCall}
            aria-label="إنهاء المكالمة"
            className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 active:scale-95 transition-all"
          >
            <PhoneOff className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};
