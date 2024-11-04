import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

interface PricingCardProps {
  title: string;
  price: number;
  description: string;
  features: string[];
  isSubscription?: boolean;
  disabled?: boolean;
  onSelectPlan: () => void;
}

export function PricingCard({
  title,
  price,
  description,
  features,
  isSubscription = false,
  disabled = false,
  onSelectPlan,
}: PricingCardProps) {
  return (
    <Card className="w-[300px] shadow-lg">
      <CardHeader>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold">${price}</span>
          {isSubscription && <span className="text-gray-500 ml-1">/month</span>}
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onSelectPlan}
          disabled={disabled}
          className="w-full"
          variant={disabled ? 'outline' : 'default'}
        >
          {disabled ? 'Coming Soon' : 'Get Started'}
        </Button>
      </CardFooter>
    </Card>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
