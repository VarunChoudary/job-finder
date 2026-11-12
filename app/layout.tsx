import type {Metadata} from 'next';import './globals.css';
export const metadata:Metadata={title:'Job Finder — Remote work from India',description:'Find remote work open to people in India. Improve your resume, save opportunities and apply at the source. Free to use.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
