import { useState, useEffect, useCallback } from 'react';
import { Heart, Send, Sparkles, MessageCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import heroImage from '../assets/z7010725365388_8a63d3025d0c6a44affb4530ae02f842.jpg';

interface Wish {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string;
}

export default function TeacherTributeLanding() {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [showAllWishes, setShowAllWishes] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentWishIndex, setCurrentWishIndex] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';
  
  const handleNextWish = useCallback(() => {
    setCurrentWishIndex((prev) => (prev + 1) % wishes.length);
  }, [wishes.length]);

  const handlePreviousWish = useCallback(() => {
    setCurrentWishIndex((prev) => (prev - 1 + wishes.length) % wishes.length);
  }, [wishes.length]);

  const handleOpenCarousel = () => {
    if (wishes.length > 0) {
      setCurrentWishIndex(0);
      setShowCarousel(true);
    }
  };

  useEffect(() => {
    if (!showCarousel) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePreviousWish();
      } else if (e.key === 'ArrowRight') {
        handleNextWish();
      } else if (e.key === 'Escape') {
        setShowCarousel(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCarousel, handleNextWish, handlePreviousWish]);

  const fetchWishes = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/wishes`);
      if (response.ok) {
        const data = await response.json();
        setWishes(data);
      }
    } catch (error) {
      console.error('Lỗi khi tải lời chúc:', error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  const stats = [
    { number: '500+', label: 'Học Sinh' },
    { number: '20+', label: 'Giáo Viên' },
    { number: `${wishes.length}+`, label: 'Lời Tri Ân' }
  ];

  const handleSubmit = async () => {
    if (formData.name && formData.message) {
      try {
        const response = await fetch(`${API_URL}/wishes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            author: formData.name,
            content: formData.message,
          }),
        });

        if (response.ok) {
          const newWish = await response.json();
          setWishes([newWish, ...wishes]);
          setFormData({ name: '', message: '' });
          toast.success('Gửi lời tri ân thành công! Cảm ơn bạn đã chia sẻ.', {
            icon: '❤️',
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '16px',
            },
          });
        } else {
          toast.error('Có lỗi xảy ra khi gửi lời tri ân. Vui lòng thử lại.', {
            duration: 4000,
            style: {
              background: '#ef4444',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
            },
          });
        }
      } catch (error) {
        console.error('Lỗi khi gửi lời chúc:', error);
        toast.error('Có lỗi xảy ra khi gửi lời tri ân. Vui lòng thử lại.', {
          duration: 4000,
          style: {
            background: '#ef4444',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
          },
        });
      }
    } else {
      toast.error('Vui lòng điền đầy đủ thông tin!', {
        duration: 3000,
        style: {
          background: '#f59e0b',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
        }}
      />
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.3))] bg-[size:32px_32px] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-transparent to-purple-500/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/30 hover:bg-white/30 transition-all duration-500">
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span className="text-sm font-medium text-white">Tri Ân Thầy Cô</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight animate-slide-up drop-shadow-lg">
                Tôn Vinh Người Gieo Chữ 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-200 to-orange-200 mt-2 animate-gradient drop-shadow-2xl">
                  Nơi Đại Ngàn
                </span>
              </h1>
              
              <p className="text-xl text-blue-50 leading-relaxed drop-shadow-md">
                Gửi lời tri ân sâu sắc đến những người thầy, người cô đã tận tâm dạy dỗ và truyền đạt kiến thức cho chúng em.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-500 ease-in-out shadow-xl shadow-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/60 hover:scale-105 transform active:scale-95"
                >
                  Gửi Lời Tri Ân
                </button>
                <button 
                  onClick={handleOpenCarousel}
                  className="bg-white/90 backdrop-blur-sm text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-white transition-all duration-500 ease-in-out border-2 border-white/50 hover:border-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  Xem Lời Chúc
                </button>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src={heroImage}
                  alt="Teachers with students" 
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border-2 border-blue-100 hover:scale-105 transition-transform duration-500 ease-in-out animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-blue-600 fill-current animate-pulse" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{wishes.length}+</div>
                    <div className="text-sm text-gray-600">Lời Tri Ân</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>

      <section className="py-16 bg-white/80 backdrop-blur-sm border-b-2 border-blue-100 shadow-inner">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 hover:border-blue-300 hover:from-blue-100 hover:to-indigo-100 transition-all duration-500 ease-in-out hover:shadow-xl group"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500 ease-in-out will-change-transform">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-transparent via-indigo-300 to-transparent"></div>

      <section id="wishes-section" className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full mb-6 shadow-lg">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-semibold">{wishes.length} Lời Tri Ân</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">Những Lời Chúc Chân Thành</h2>
            <p className="text-xl text-gray-600 font-medium">Cảm xúc từ học sinh gửi đến thầy cô</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Đang tải lời chúc...</p>
            </div>
          ) : wishes.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời tri ân!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {(showAllWishes ? wishes : wishes.slice(0, 6)).map((wish, index) => (
              <div 
                key={wish.id} 
                className="bg-white border-2 border-blue-100 rounded-2xl p-6 hover:shadow-2xl hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-500 ease-in-out group hover:-translate-y-2 will-change-transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors duration-500 ease-in-out">{wish.title}</h3>
                    <p className="text-sm text-gray-500">{wish.date}</p>
                  </div>
                  <Heart className="w-5 h-5 text-red-500 fill-current opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:scale-125" />
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{wish.content}</p>
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-500 ease-in-out">
                    <span className="text-sm font-semibold text-blue-600 group-hover:text-white transition-colors duration-500 ease-in-out">
                      {wish.author.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{wish.author}</span>
                </div>
              </div>
              ))}
            </div>
          )}

          {!loading && wishes.length > 6 && (
            <div className="text-center mt-12">
              <button 
                onClick={() => setShowAllWishes(!showAllWishes)}
                className="bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:from-blue-200 hover:to-indigo-200 border-2 border-blue-200 hover:border-blue-400 transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:scale-105 transform active:scale-95"
              >
                {showAllWishes ? 'Thu gọn' : `Xem thêm ${wishes.length - 6} lời chúc`}
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>

      <section id="form-section" className="py-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.4),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-grid-slate-100 opacity-10 bg-[size:32px_32px]"></div>
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Gửi Lời Tri Ân</h2>
              <p className="text-xl text-blue-50 drop-shadow-md">Hãy chia sẻ những cảm xúc của bạn với thầy cô</p>
            </div>

            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-white/50 p-8 lg:p-12 hover:shadow-3xl transition-shadow duration-500 ease-in-out">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 ease-in-out hover:border-blue-400"
                    placeholder="Nhập họ tên của bạn"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Lời nhắn tri ân <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all resize-none hover:border-indigo-300"
                    placeholder="Viết lời tri ân của bạn dành cho thầy cô..."
                  ></textarea>
                </div>
                
                <button 
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-500 hover:to-orange-600 transition-all duration-500 ease-in-out shadow-xl shadow-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/60 flex items-center justify-center gap-2 hover:scale-105 transform active:scale-95"
                >
                  <Send className="w-5 h-5" />
                  Gửi lời tri ân ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>

      <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-500 ease-in-out shadow-xl shadow-amber-500/50">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tri Ân Thầy Cô</h3>
            <p className="text-blue-200">Tôn vinh người gieo chữ nơi đại ngàn</p>
          </div>
        </div>
      </footer>

      {showCarousel && wishes.length > 0 && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowCarousel(false)}
        >
          <div 
            className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-4 p-8 lg:p-12 transform transition-all duration-500 ease-in-out animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCarousel(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full mb-4 shadow-lg">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {currentWishIndex + 1} / {wishes.length}
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {wishes[currentWishIndex].title}
                </h2>
                <p className="text-gray-500 text-sm">{wishes[currentWishIndex].date}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 lg:p-12 min-h-[300px] flex items-center border-2 border-blue-100">
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {wishes[currentWishIndex].content}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-blue-600">
                    {wishes[currentWishIndex].author.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{wishes[currentWishIndex].author}</p>
                  <p className="text-sm text-gray-500">Người gửi</p>
                </div>
              </div>
            </div>

            {wishes.length > 1 && (
              <>
                <button
                  onClick={handlePreviousWish}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 border border-gray-200"
                  aria-label="Lời chúc trước"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextWish}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 border border-gray-200"
                  aria-label="Lời chúc tiếp theo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {wishes.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {wishes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentWishIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out ${
                      index === currentWishIndex
                        ? 'bg-blue-600 w-8'
                        : 'bg-gray-300 hover:bg-blue-400'
                    }`}
                    aria-label={`Đi đến lời chúc ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}