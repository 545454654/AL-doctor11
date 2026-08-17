import React, { useState } from 'react';
import {
  Wallet,
  X,
  ArrowUpRight,
  ArrowDownLeft,
  KeyRound,
  RefreshCw,
  PlusCircle,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import { Transaction } from '../types';

interface WalletInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  transactions: Transaction[];
  pin: string;
  onChangePin: (newPin: string) => void;
  onAddFunds: (amount: number) => void;
  onSelectQuickCode: (code: string) => void;
}

export const WalletInfoModal: React.FC<WalletInfoModalProps> = ({
  isOpen,
  onClose,
  balance,
  transactions,
  pin,
  onChangePin,
  onAddFunds,
  onSelectQuickCode,
}) => {
  const [editingPin, setEditingPin] = useState(false);
  const [newPinVal, setNewPinVal] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinVal.length === 6 && /^\d+$/.test(newPinVal)) {
      onChangePin(newPinVal);
      setEditingPin(false);
      setNewPinVal('');
    }
  };

  const copyToDialer = (code: string) => {
    onSelectQuickCode(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">محفظة فودافون كاش</span>
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-right">
          {/* Balance Card */}
          <div className="bg-zinc-900 text-white rounded-2xl p-5 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                Vodafone Cash
              </span>
              <span>رصيد المحفظة الحالي</span>
            </div>

            <div className="text-3xl font-extrabold text-white tracking-tight flex items-baseline justify-end gap-1.5 font-mono">
              <span className="text-sm font-normal text-zinc-400">ج.م</span>
              <span>{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-800 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onAddFunds(1000)}
                  className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-emerald-400 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>إيداع 1000 ج.م</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-zinc-400">
                <span className="font-mono text-zinc-200">{pin}</span>
                <KeyRound className="w-3.5 h-3.5 text-red-400" />
                <span>الرقم السري:</span>
              </div>
            </div>
          </div>

          {/* Quick USSD Codes section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400">اضغط لنسخ الكود وتجربته فوراً</span>
              <div className="flex items-center gap-1 text-zinc-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>أكواد فودافون كاش السريعة</span>
              </div>
            </div>

            <div className="space-y-2">
              {[
                {
                  code: '*9*7*01010375025*100#',
                  label: 'تحويل 100 ج.م إلى ميرا عمري',
                  desc: 'كود تحويل الأموال المباشر المطلوب',
                },
                {
                  code: '*9*7*01098688815*500#',
                  label: 'تحويل 500 ج.م إلى بابا',
                  desc: 'كود تحويل سريع',
                },
                {
                  code: '*9#',
                  label: 'قائمة فودافون كاش الرئيسية التفاعلية',
                  desc: 'فتح القائمة الرئيسية للخدمات',
                },
                {
                  code: '*9*13#',
                  label: 'الاستعلام عن الرصيد',
                  desc: 'معرفة الرصيد المتبقي بطلب الرقم السري',
                },
              ].map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => copyToDialer(item.code)}
                  className="w-full bg-zinc-50 hover:bg-zinc-100/90 border border-zinc-200 rounded-xl p-3 flex items-center justify-between text-right transition-all group"
                >
                  <div className="p-1.5 text-zinc-400 group-hover:text-red-600 transition-colors">
                    {copiedCode === item.code ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-zinc-900">{item.label}</span>
                    <span className="text-[11px] font-mono text-red-600 font-medium dir-ltr">
                      {item.code}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Edit PIN Option */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3">
            {!editingPin ? (
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setEditingPin(true)}
                  className="text-xs text-red-600 font-semibold hover:underline"
                >
                  تغيير الرقم السري
                </button>
                <span className="text-xs text-zinc-600">الرقم السري للمحفظة (PIN)</span>
              </div>
            ) : (
              <form onSubmit={handleSavePin} className="space-y-2">
                <label className="block text-xs font-semibold text-zinc-700">
                  أدخل رقم سري جديد من 6 أرقام:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700"
                  >
                    حفظ
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPin(false)}
                    className="px-3 py-1.5 bg-zinc-200 text-zinc-700 rounded-lg text-xs font-medium"
                  >
                    إلغاء
                  </button>
                  <input
                    type="password"
                    maxLength={6}
                    value={newPinVal}
                    onChange={(e) => setNewPinVal(e.target.value)}
                    placeholder="500500"
                    className="flex-1 h-9 px-3 bg-white border border-zinc-300 rounded-lg text-center font-mono text-sm tracking-widest outline-none focus:border-red-600"
                  />
                </div>
              </form>
            )}
          </div>

          {/* Transactions Log */}
          <div>
            <h4 className="text-xs font-bold text-zinc-800 mb-2">سجل العمليات الأخير</h4>
            <div className="space-y-2">
              {transactions.length === 0 ? (
                <div className="text-center py-6 text-zinc-400 text-xs">
                  لا توجد معاملات سابقة بعد
                </div>
              ) : (
                transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="bg-white border border-zinc-200 rounded-xl p-3 flex items-center justify-between text-xs"
                  >
                    <div className="flex flex-col items-start font-mono">
                      <span
                        className={`font-bold ${
                          tx.type === 'transfer_out' ? 'text-red-600' : 'text-emerald-600'
                        }`}
                      >
                        {tx.type === 'transfer_out' ? '-' : '+'}
                        {tx.amount.toFixed(2)} ج.م
                      </span>
                      {tx.fee > 0 && (
                        <span className="text-[10px] text-zinc-400">رسوم: {tx.fee} ج.م</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="flex flex-col items-end">
                        <span className="font-semibold text-zinc-900">
                          {tx.type === 'transfer_out'
                            ? `تحويل إلى ${tx.recipientName || tx.recipientNumber}`
                            : `استلام من ${tx.senderNumber}`}
                        </span>
                        <span className="text-[10px] text-zinc-400">{tx.timestamp}</span>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          tx.type === 'transfer_out'
                            ? 'bg-red-50 text-red-600'
                            : 'bg-emerald-50 text-emerald-600'
                        }`}
                      >
                        {tx.type === 'transfer_out' ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
