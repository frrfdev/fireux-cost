import { useJoyrideContext } from '@/providers/joyride-context';
import { ProductForm } from '../home/components/product.form';
import Joyride, { CallBackProps, Step } from 'react-joyride';

const steps = [
  {
    title: <h1 className="text-xl font-bold text-orange-500">Bem-vindo ao Fireux Cost</h1>,
    content: (
      <div>
        <h2 className="text-md">Nesse tutorial vamos te ensinar como cadastrar um produto e seus ingredientes</h2>
      </div>
    ),
    target: '.product-form',
    placement: 'center',
    disableOverlayClose: true,
    disableCloseOnEsc: true,
  },
  {
    title: <h1 className="text-xl font-bold text-orange-500">Cadastre seu primeiro produto</h1>,
    content: (
      <div>
        <h2 className="text-md">
          Nem todo produto é um produto final, as vezes ele é um ingrediente, sabendo disso vamos cadastrar um ovo de
          galinha como exemplo. Primeiro coloque o nome do produto no campo &quot;Nome&quot;
        </h2>
      </div>
    ),
    target: '.product-form-name',
    placement: 'right',
    spotlightClicks: true,
    disableCloseOnEsc: true,
    disableOverlayClose: true,
  },
  {
    title: <h1 className="text-xl font-bold text-orange-500">Entendendo a unidade de base de cálculo</h1>,
    content: (
      <div>
        <h2 className="text-md">
          A unidade de base de cálculo é a unidade que você vai usar para calcular o custo do produto. Por exemplo, no
          caso do ovo ele pode ser calculado por unidade, assim sabemos o custo unitário de cada ovo, porém para farinha
          seria interessante saber o valor por grama. Clique em &quot;Selecione uma Unidade&quot;
        </h2>
      </div>
    ),
    target: '.product-form-unit',
    placement: 'right',
    showSkipButton: false,
    hideFooter: true,
    spotlightClicks: true,
    disableCloseOnEsc: true,
    disableOverlayClose: true,
  },
  // ? Esse step é ativado dentro do unit-select quando o usuário abre o select de unidades
  {
    title: <h1 className="text-xl font-bold text-orange-500">Entendendo a unidade de base de cálculo</h1>,
    content: (
      <div>
        <h2 className="text-md">Agora selecione &quot;Unidade&quot; como unidade de base de cálculo.</h2>
      </div>
    ),
    target: '.unit-select-option',
    placement: 'right',
    showSkipButton: false,
    hideFooter: true,
    spotlightClicks: true,
    disableOverlayClose: true,
    disableCloseOnEsc: true,
  },
  // ? Esse step é ativado dentro do product.form quando o usuário seleciona a unidade
  {
    title: <h1 className="text-xl font-bold text-orange-500">Definindo o custo manualmente</h1>,
    content: (
      <div>
        <h2 className="text-md">
          Agora precisamos decidir se o custo será definido manualmente ou será calculado automaticamente de acordo com
          os ingredientes. No caso do ovo, vamos definir manualmente, uma vez que ele não possui ingredientes. Clique em
          &quot;Definir custo por unidade&quot;
        </h2>

        <p className="text-sm bg-yellow-200 rounded-md p-2">
          O custo é diferente do preço, o custo é o quanto você gasta para produzir/comprar o produto e o preço é o
          quanto você vende.
        </p>
      </div>
    ),
    target: '.product-form-manual-price',
    placement: 'right',
    spotlightClicks: true,
    disableCloseOnEsc: true,
    disableOverlayClose: true,
  },
  // ? Esse step é ativado dentro do product.form quando o usuário marca a opção "Definir Custo Por Unidade?" como true
  {
    title: <h1 className="text-xl font-bold text-orange-500">Inserindo custo</h1>,
    content: (
      <div>
        <h2 className="text-md">
          Agora você pode colocar o custo da unidade (un., kg, ml, g, etc) no campo &quot;Custo&quot;, caso você não
          saiba o custo, você pode clicar em &quot;Não sei o custo&quot; e o sistema vai calcular o custo
          automaticamente de acordo com os ingredientes. Vamos usar essa ferramenta para calcular o custo da unidade do
          ovo.
        </h2>
      </div>
    ),
    target: '.product-form-price-calc',
    placement: 'right',
    spotlightClicks: true,
    disableCloseOnEsc: true,
    disableOverlayClose: true,
  },
  // ? Esse step é ativado dentro do product.form quando o usuário clica no botão "Eu não sei o custo" dentro do price-calc-form
  {
    title: <h1 className="text-xl font-bold text-orange-500">Calculando o custo automaticamente</h1>,
    content: (
      <div>
        <h2 className="text-md">
          Aqui você consegue uma ajuda para descobrir o custo da unidade selecionada do seu produto. Vamos imaginar que
          você comprou uma bandeja de ovos com 30 unidades por R$27,50.
        </h2>
      </div>
    ),
    target: '.price-calc-form',
    placement: 'right',
  },
  // ? Esse step é ativado dentro do price-calc-form quando o usuário clica no botão "Calcular"
  {
    title: <h1 className="text-xl font-bold text-orange-500">Inserindo a quantidade de produtos comprados</h1>,
    content: (
      <div>
        <h2 className="text-md">
          Na quantidade de produtos comprados, coloque 30, que é a quantidade de ovos que você comprou.
        </h2>
      </div>
    ),
    target: '.price-calc-form-quantity',
    placement: 'right',
  },
] as Step[];

export const Playground = () => {
  const { setStepIndex, stepIndex } = useJoyrideContext();

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type, step } = data;

    const userInteraction = [
      '.product-form-name',
      '.product-form-unit',
      '.product-form-manual-price',
      '.product-form-price-calc',
    ];
    if (userInteraction.includes(step?.target as string) && type === 'step:after') {
      return;
    }

    const delayed = ['.product-form-unit'];
    if (
      (action === 'next' || action === 'close') &&
      type === 'step:after' &&
      !delayed.includes(step?.target as string)
    ) {
      setTimeout(() => {
        setStepIndex(index + 1);
      }, 100);
    }
  };

  return (
    <div className="h-full w-full">
      <Joyride continuous steps={steps} stepIndex={stepIndex} callback={handleJoyrideCallback} />
      <ProductForm></ProductForm>
    </div>
  );
};
