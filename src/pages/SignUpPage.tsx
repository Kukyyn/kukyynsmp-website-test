import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) navigate('/dashboard', { replace: true });
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Hesla se neshodují.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registrace se nezdařila.';
      setError(
        msg.includes('User already registered')
          ? 'Tento e-mail je již zaregistrován.'
          : msg.includes('Password should be')
          ? 'Heslo musí mít alespoň 6 znaků.'
          : msg
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center px-4">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.03) 31px, rgba(255,255,255,0.03) 32px),
            repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255,255,255,0.03) 31px, rgba(255,255,255,0.03) 32px)
          `,
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-6">
            <div className="w-10 h-10 bg-forest-600 rounded-sm flex items-center justify-center pixel-border group-hover:bg-forest-500 transition-colors">
              <span className="font-minecraft text-[9px] text-white leading-none">K</span>
            </div>
            <span className="font-minecraft text-sm text-stone-100 tracking-tight">KukyynSMP</span>
          </Link>
          <h1 className="font-minecraft text-xl text-stone-100 mb-2">Registrace</h1>
          <p className="text-stone-500 text-sm">Vytvoř si účet a připoj se ke světu.</p>
        </div>

        <div className="bg-stone-900 border border-stone-700 rounded-xl p-8 pixel-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-stone-400 text-xs font-medium mb-2">E-mail</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="hrac@kukyyn.cz"
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-9 pr-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-forest-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-400 text-xs font-medium mb-2">Heslo</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-9 pr-10 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-forest-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <p className="text-stone-600 text-xs mt-1.5">Minimálně 6 znaků.</p>
            </div>

            <div>
              <label className="block text-stone-400 text-xs font-medium mb-2">Potvrdit heslo</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-9 pr-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-forest-500 transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-950/60 border border-red-800 rounded-lg px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mc-button bg-forest-700 hover:bg-forest-600 text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={15} />}
              {loading ? 'Vytváření účtu...' : 'Vytvořit účet'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-800 text-center">
            <p className="text-stone-500 text-sm">
              Už máš účet?{' '}
              <Link to="/login" className="text-forest-400 hover:text-forest-300 transition-colors font-medium">
                Přihlaš se
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-stone-600 hover:text-stone-400 text-xs transition-colors">
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </div>
  );
}
