import Button from '@/components/atoms/Button'
import Image from 'next/image'

type SocialLoginButtonProps = {
  provider: 'google'
  onClick: () => void
  label?: string
}

const providerConfig = {
  google: {
    icon: '/icons/Google_Favicon_2025.png',
    alt: 'Google',
    defaultLabel: 'Continuar con google',
  },
}

export default function SocialLoginButton({
  provider,
  onClick,
  label
}: SocialLoginButtonProps) {
  const config = providerConfig[provider]

  return (
    <Button variant="social" onClick={onClick}>
      <div className="w-6 h-6 absolute">
        <Image
          src={config.icon}
          alt={config.alt}
          fill={true}
        />
      </div>
      <span className="flex-1">{label ?? config.defaultLabel}</span>
    </Button>
  )
}
