import { EditorScreen, MembershipScreen, RewardsScreen, ReferralScreen } from '../components/screens'
import { Palette, BadgeCheck, Coins, Share2 } from 'lucide-react'

export const TABS = [
  {
    id: 'create',
    label: 'Create Posts',
    icon: Palette,
    Screen: EditorScreen,
    title: 'Festival posts, made in minutes',
    desc: 'Start from a festival template, edit the text, add a photo and your logo, preview the result, then share it.',
    points: ['Festival and business promo templates', 'Hindi and English text', 'Preview before you share'],
    chips: [['Templates', 'Festival & promo'], ['Languages', 'Hindi + English']],
  },
  {
    id: 'membership',
    label: 'Membership',
    icon: BadgeCheck,
    Screen: MembershipScreen,
    title: 'One membership, one clear view',
    desc: 'A business membership concept that brings the editor, business profile and listing features together.',
    points: ['365-day membership validity', 'Business profile and listing', 'Same account across web and apps'],
    chips: [['Validity', '365 days'], ['Access', 'Based on active plan']],
  },
  {
    id: 'rewards',
    label: 'Rewards',
    icon: Coins,
    Screen: RewardsScreen,
    title: 'Rewards that are easy to follow',
    desc: 'A wallet-style view of points, daily login and sample offers, designed so every balance change is traceable.',
    points: ['Registration and daily login points', 'Full points history', 'Offers from participating businesses'],
    chips: [['Registration', '100 pts'], ['Daily login', '5 pts / day']],
  },
  {
    id: 'referrals',
    label: 'Referrals',
    icon: Share2,
    Screen: ReferralScreen,
    title: 'A referral network you can read at a glance',
    desc: 'Share a personal link and follow direct and second-level referrals with clear status steps.',
    points: ['Personal referral link', 'Two-level referral view', 'Pending, Approved and Paid statuses'],
    chips: [['Levels', 'Two'], ['Tracking', 'Status by status']],
  },
]
