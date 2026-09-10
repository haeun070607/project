import { useState } from "react";

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-5xl px-8 py-10">
        {/* 공지사항 */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-xs font-semibold tracking-widest text-gray-900 uppercase">공지사항</h3>
            <span className="text-xs text-gray-400">서비스 점검 안내 (2026.09.10)</span>
          </div>
          <a href="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors underline underline-offset-2">
            서비스 전체보기
          </a>
        </div>

        {/* 파트너 메뉴 */}
        <div className="flex gap-6 mb-8">
          <a href="/" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">회사 정보</a>
          <a href="/" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">무슨 정보</a>
          <a href="/" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">이용안내</a>
        </div>

        {/* 정책 및 약관 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4">
          <a href="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">회사소개</a>
          <a href="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">이용약관</a>
          <a href="/" className="text-xs font-semibold text-gray-700 hover:text-gray-900 transition-colors">개인정보처리방침</a>
          <a href="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">청소년보호정책</a>
          <a href="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">네이버 정책</a>
          <a href="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">고객센터</a>
        </div>

        <address className="not-italic">
          <a href="/" className="text-xs text-gray-300 hover:text-gray-500 transition-colors">ⓒ Blog</a>
        </address>
      </div>
    </footer>
  );
}

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="size-full flex flex-col bg-gray-50 font-sans">
      <div className="w-full max-w-md bg-white px-10 py-12">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">회원가입</h1>
          <p className="mt-1.5 text-sm text-gray-400">계정을 만들어 시작하세요</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium tracking-wide text-gray-500 uppercase">
              이름
            </label>
            <input
              type="text"
              placeholder="홍길동"
              className="w-full border-b border-gray-200 bg-transparent py-2.5 text-sm text-gray-900 placeholder-gray-300 outline-none transition-colors focus:border-gray-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium tracking-wide text-gray-500 uppercase">
              이메일
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="w-full border-b border-gray-200 bg-transparent py-2.5 text-sm text-gray-900 placeholder-gray-300 outline-none transition-colors focus:border-gray-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium tracking-wide text-gray-500 uppercase">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="8자 이상 입력"
                className="w-full border-b border-gray-200 bg-transparent py-2.5 pr-8 text-sm text-gray-900 placeholder-gray-300 outline-none transition-colors focus:border-gray-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-2.5 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showPassword ? (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium tracking-wide text-gray-500 uppercase">
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="비밀번호 재입력"
                className="w-full border-b border-gray-200 bg-transparent py-2.5 pr-8 text-sm text-gray-900 placeholder-gray-300 outline-none transition-colors focus:border-gray-900"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-0 top-2.5 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showConfirm ? (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-1">
            <input
              id="agree"
              type="checkbox"
              className="mt-0.5 h-4 w-4 cursor-pointer accent-gray-900"
            />
            <label htmlFor="agree" className="text-sm text-gray-400 leading-relaxed cursor-pointer">
              <span className="text-gray-700 underline underline-offset-2 cursor-pointer">이용약관</span> 및{" "}
              <span className="text-gray-700 underline underline-offset-2 cursor-pointer">개인정보처리방침</span>에 동의합니다
            </label>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-gray-900 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-gray-700"
            >
              가입하기
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          이미 계정이 있으신가요?{" "}
          <a href="#" className="text-gray-900 underline underline-offset-2 hover:text-gray-600 transition-colors">
            로그인
          </a>
        </p>
      </div>
      <div className="flex-1" />
      <Footer />
    </div>
  );
}
