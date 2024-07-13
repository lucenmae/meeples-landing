import {
  ArrowPathIcon,
  BuildingStorefrontIcon,
  ChartPieIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PresentationChartLineIcon,
  ShoppingCartIcon,
  TruckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: IconComponent,
  title,
  description,
}) => {
  return (
    <div className='relative w-full text-center max-w-xs md:max-w-sm lg:max-w-xs xl:max-w-sm mx-auto group '>
      <div className='bg-orange-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-orange-600 outline outline-orange-600 outline-1'>
        <IconComponent
          className='stroke-orange-600 transition-all duration-500 group-hover:stroke-white'
          width={30}
          height={30}
        />
      </div>
      <h4 className='text-lg font-medium text-gray-900 mb-3 capitalize'>
        {' '}
        {title}
      </h4>
      <p className='text-sm font-normal text-gray-500'> {description}</p>
    </div>
  );
};

function FeaturesSection() {
  const features: Feature[] = [
    {
      icon: UserGroupIcon,
      title: 'Human Resources Management',
      description:
        'The HRIS product streamlines hiring, recruitment, timekeeping, payroll, and employee file management for efficient and effective HR operations.',
    },
    {
      icon: ComputerDesktopIcon,
      title: 'KPI Monitoring and Asset Management',
      description:
        'The KPI Monitoring and Asset Management system seamlessly tracks employee productivity and manages company assets.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Point of Sale (POS)',
      description:
        'The optimized POS system enhances retail, wholesale, and pharmaceutical operations.',
    },
    {
      icon: PresentationChartLineIcon,
      title: 'Field Sales and Account Management',
      description:
        'Empower your sales team with mobile tools for efficient on-the-go sales and account management.',
    },
    {
      icon: HeartIcon,
      title: 'Customer Relationship Management',
      description:
        'Maintain detailed customer data and enhance relationships with personalized service.',
    },
    {
      icon: ShoppingCartIcon,
      title: 'Purchasing Management',
      description:
        'Streamline procurement with both classical and singular purchasing models.',
    },
    {
      icon: TruckIcon,
      title: 'Inventory and Warehousing',
      description:
        'Monitor inventory levels and manage product transfers with real-time visibility.',
    },
    {
      icon: MagnifyingGlassIcon,
      title: 'Audit Management',
      description:
        'Conduct thorough audits with detailed trails and comprehensive reports.',
    },
    {
      icon: ChartPieIcon,
      title: 'Financial Management',
      description:
        'Oversee financial health with profit and loss monitoring, income statements, and balance sheets.',
    },
    {
      icon: ArrowPathIcon,
      title: 'Production Management',
      description:
        'Manage the production lifecycle from raw materials to finished goods efficiently.',
    },
    {
      icon: BuildingStorefrontIcon,
      title: 'Supplier Management',
      description:
        'Track supplier transactions and efficiently manage accounts payable.',
    },
  ];

  return (
    <section id='features' className='py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-14 text-center'>
          <span className='text-md font-medium text-black text-center'>
            Features
          </span>
          <h2 className='text-4xl text-center font-bold text-gray-900 py-5'>
            Everything You Need in{' '}
            <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-400 to-orange-500'>
              One Place
            </span>
          </h2>
          <p className='text-base font-normal max-w-md md:max-w-2xl mx-auto text-center leading-7 text-gray-600 mb-9 my-2'>
            Our platform integrates{' '}
            <span className='font-bold'>ERP, HRIS, POS, CRM, and more</span>{' '}
            into one seamless, cost-effective solution. Accessible on any
            device, Cirquolus ensures your business{' '}
            <span className='font-bold'>
              runs smoothly, whether you're online or offline.
            </span>
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
