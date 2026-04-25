import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Padrões de paths suspeitos — bots varrendo arquivos sensíveis
const BLOCKED_PATHS = [
  /^\/\.env/,           // /.env, /.env.local, /.env.production etc
  /^\/\.git/,           // /.git/config etc
  /^\/wp-/,             // WordPress bots
  /^\/phpmy/,           // phpMyAdmin bots
  /^\/admin\.php/,
  /^\/xmlrpc\.php/,
  /^\/config\./,
  /^\/backup/,
  /\/\.ssh/,
  /\/\.aws/,
];

// User-agents conhecidos de bots maliciosos / scanners
const BLOCKED_UA_PATTERNS = [
  /sqlmap/i,
  /nikto/i,
  /masscan/i,
  /zgrab/i,
  /nmap/i,
  /python-requests\/2\.[0-2]/i,  // versões antigas usadas por scrapers
  /go-http-client\/1\.1/i,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get('user-agent') || '';

  // Bloqueia paths suspeitos
  for (const pattern of BLOCKED_PATHS) {
    if (pattern.test(pathname)) {
      return new NextResponse(null, { status: 404 });
    }
  }

  // Bloqueia user-agents maliciosos
  for (const pattern of BLOCKED_UA_PATTERNS) {
    if (pattern.test(ua)) {
      return new NextResponse(null, { status: 403 });
    }
  }

  // HEAD requests excessivos na raiz (uptime bots sem identificação)
  // Deixa passar — não são prejudiciais, só ruidosos
  // Vercel CDN vai cachear o HEAD automaticamente

  return NextResponse.next();
}

export const config = {
  // Aplica em todas as rotas exceto arquivos estáticos do Next
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
