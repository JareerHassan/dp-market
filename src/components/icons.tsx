import {
  Bot,
  Terminal,
  Zap,
  ClipboardCopy,
  Code,
  Database,
  Component,
  Wrench,
  Search,
  Star,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  X,
  Menu,
  ShoppingCart,
  PlusCircle,
  BarChart,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  Home,
  LayoutGrid,
  Heart,
  Download,
  MessageSquare,
  DollarSign,
  Eye,
  Wallet,
  CheckCircle,
  ArrowRight,
  Sun,
  Moon,
  Send,
  User,
  type LucideProps,
} from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

export type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

export const Icons = {
  Bot,
  Terminal,
  Zap,
  ClipboardCopy,
  Code,
  Database,
  Component,
  Wrench,
  Search,
  Star,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  X,
  Menu,
  ShoppingCart,
  PlusCircle,
  BarChart,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  Home,
  LayoutGrid,
  Heart,
  Download,
  MessageSquare,
  DollarSign,
  Eye,
  Wallet,
  CheckCircle,
  ArrowRight,
  Sun,
  Moon,
  Send,
  User,
  Logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        d="M128 24a104 104 0 1 0 104 104A104.1 104.1 0 0 0 128 24Zm-44.1 160.1a52 52 0 0 1 88.2 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <path
        d="M172.1 87.9a52 52 0 0 0-88.2 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <circle cx="128" cy="128" r="20" />
    </svg>
  ),
};
