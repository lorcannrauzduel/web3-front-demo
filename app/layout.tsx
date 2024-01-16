'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<RecoilRoot>
			<html lang='en'>
				<body className={inter.className}>
					<Toaster />
					<Navbar />
					<main className='flex min-h-screen flex-col p-24'>{children}</main>
				</body>
			</html>
		</RecoilRoot>
	);
}
