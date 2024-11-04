import { ProductForm } from '../home/components/product.form';

// const steps = [
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">
//         Bem-vindo ao Fireux Cost
//       </h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           Nesse tutorial vamos te ensinar como cadastrar um produto e seus
//           ingredientes
//         </h2>
//       </div>
//     ),
//     target: '.product-form',
//     placement: 'center',
//     disableOverlayClose: true,
//     disableCloseOnEsc: true,
//   },
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">
//         Cadastre seu primeiro produto
//       </h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           Nem todo produto é um produto final, as vezes ele é um ingrediente,
//           sabendo disso vamos cadastrar um ovo de galinha como exemplo. Primeiro
//           coloque o nome do produto no campo &quot;Nome&quot;
//         </h2>
//       </div>
//     ),
//     target: '.product-form-name',
//     placement: 'right',
//     spotlightClicks: true,
//     disableCloseOnEsc: true,
//     disableOverlayClose: true,
//   },
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">
//         Entendendo a unidade de base de cálculo
//       </h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           A unidade de base de cálculo é a unidade que você vai usar para
//           calcular o custo do produto. Por exemplo, no caso do ovo ele pode ser
//           calculado por unidade, assim sabemos o custo unitário de cada ovo,
//           porém para farinha seria interessante saber o valor por grama. Clique
//           em &quot;Selecione uma Unidade&quot;
//         </h2>
//       </div>
//     ),
//     target: '.product-form-unit',
//     placement: 'right',
//     showSkipButton: false,
//     hideFooter: true,
//     spotlightClicks: true,
//     disableCloseOnEsc: true,
//     disableOverlayClose: true,
//   },
//   // ? Esse step é ativado dentro do unit-select quando o usuário abre o select de unidades
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">
//         Entendendo a unidade de base de cálculo
//       </h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           Agora selecione &quot;Unidade&quot; como unidade de base de cálculo.
//         </h2>
//       </div>
//     ),
//     target: '.unit-select-option',
//     placement: 'right',
//     showSkipButton: false,
//     hideFooter: true,
//     spotlightClicks: true,
//     disableOverlayClose: true,
//     disableCloseOnEsc: true,
//   },
//   // ? Esse step é ativado dentro do product.form quando o usuário seleciona a unidade
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">
//         Definindo o custo manualmente
//       </h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           Agora precisamos decidir se o custo será definido manualmente ou será
//           calculado automaticamente de acordo com os ingredientes. No caso do
//           ovo, vamos definir manualmente, uma vez que ele não possui
//           ingredientes. Clique em &quot;Definir custo por unidade&quot;
//         </h2>

//         <p className="text-sm bg-yellow-200 rounded-md p-2">
//           O custo é diferente do preço, o custo é o quanto você gasta para
//           produzir/comprar o produto e o preço é o quanto você vende.
//         </p>
//       </div>
//     ),
//     target: '.product-form-manual-price',
//     placement: 'right',
//     spotlightClicks: true,
//     disableCloseOnEsc: true,
//     disableOverlayClose: true,
//   },
//   // ? Esse step é ativado dentro do product.form quando o usuário marca a opção "Definir Custo Por Unidade?" como true
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">Inserindo custo</h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           Agora você pode colocar o custo da unidade (un., kg, ml, g, etc) no
//           campo &quot;Custo&quot;, caso você não saiba o custo, você pode clicar
//           em &quot;Não sei o custo&quot; e o sistema vai calcular o custo
//           automaticamente de acordo com os ingredientes. Vamos usar essa
//           ferramenta para calcular o custo da unidade do ovo.
//         </h2>
//       </div>
//     ),
//     target: '.product-form-price-calc',
//     placement: 'right',
//     spotlightClicks: true,
//     disableCloseOnEsc: true,
//     disableOverlayClose: true,
//   },
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">
//         Inserindo a quantidade de produtos comprados
//       </h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           Aqui você consegue uma ajuda para descobrir o custo da unidade
//           selecionada do seu produto. Vamos imaginar que você comprou uma
//           bandeja de ovos com 30 unidades por R$27,50.
//           <br />
//           <br />
//           <strong>
//             Na quantidade de produtos comprados, coloque 30, que é a quantidade
//             de ovos que você comprou.
//           </strong>
//         </h2>
//       </div>
//     ),
//     target: '.price-calc-form-quantity',
//     placement: 'right',
//     spotlightClicks: true,
//     disableCloseOnEsc: true,
//     disableOverlayClose: true,
//   },
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">
//         Inserindo a unidade da compra
//       </h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           Agora coloque a unidade da compra, no caso do ovo, seria
//           &quot;Unidade&quot; já que você comprou 30 unidades. Se tivesse
//           comprado 500 gramas de farinha por exemplo, aqui você colocaria
//           &quot;Gramas&quot;.
//           <br />
//           <br />
//           <strong>Selecione &quot;Unidade&quot;</strong>
//         </h2>
//       </div>
//     ),
//     target: '.price-calc-form-unit',
//     placement: 'right',
//     spotlightClicks: true,
//     disableCloseOnEsc: true,
//     disableOverlayClose: true,
//   },
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">
//         Selecionando a unidade de compra
//       </h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           <br />
//           <br />
//           <strong>Selecione &quot;Unidade&quot;</strong>
//         </h2>
//       </div>
//     ),
//     target: '.unit-select-option',
//     placement: 'right',
//     spotlightClicks: true,
//     disableCloseOnEsc: true,
//     disableOverlayClose: true,
//   },
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">
//         Inserindo o preço de compra
//       </h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           Agora coloque o preço de compra, no caso do ovo, seria R$27,50.
//           <br />
//           <br />
//           <strong>Coloque R$27,50</strong>
//         </h2>
//       </div>
//     ),
//     target: '.price-calc-form-price',
//     placement: 'right',
//     spotlightClicks: true,
//     disableCloseOnEsc: true,
//     disableOverlayClose: true,
//   },
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">
//         Calculando o custo do produto
//       </h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           Agora o sistema vai calcular o custo do produto com base nas
//           informações que você inseriu.
//           <br />
//           <br />
//           <strong>Clique em &quot;Calcular&quot;</strong>
//         </h2>
//       </div>
//     ),
//     target: '.price-calc-form-submit',
//     placement: 'right',
//     spotlightClicks: true,
//     disableCloseOnEsc: true,
//     disableOverlayClose: true,
//   },
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">
//         Confirmando a criação do produto
//       </h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           Agora é só clicar em &quot;Criar&quot; para criar o produto.
//           <br />
//           <br />
//         </h2>
//       </div>
//     ),
//     target: '.product-form-submit',
//     placement: 'top',
//     spotlightClicks: true,
//     disableCloseOnEsc: true,
//     disableOverlayClose: true,
//   },
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">
//         Vendo o produto criado
//       </h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           Aqui você pode ver o produto criado, e também editar ou deletar
//           conforme sua necessidade.
//           <br />
//           <br />
//         </h2>
//       </div>
//     ),
//     target: '.product-list',
//     placement: 'left',
//     spotlightClicks: true,
//     disableCloseOnEsc: true,
//     disableOverlayClose: true,
//   },
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">
//         Criando um produto com ingredientes
//       </h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           Como vimos anteriormente, nem todo produto é um produto final, ele
//           pode ser um ingrediente para outro produto. Vamos criar um ovo frito
//           como exemplo.
//           <br />
//           <br />
//           <ul className="flex flex-col gap-2 text-start list-disc">
//             <li>
//               <strong>Preencha o nome como &quot;Ovo Frito&quot;</strong>
//             </li>
//             <li>
//               <strong>
//                 Selecione &quot;Unidade&quot; como unidade de base de cálculo
//               </strong>
//             </li>
//             <li>
//               <strong>
//                 Deixe &quot;Definir custo por unidade&quot; desmarcado para que
//                 o sistema calcule o custo automaticamente
//               </strong>
//             </li>
//           </ul>
//         </h2>
//       </div>
//     ),
//     target: '.product-form',
//     placement: 'left',
//     spotlightClicks: true,
//     disableCloseOnEsc: true,
//     disableOverlayClose: true,
//   },
//   {
//     title: (
//       <h1 className="text-xl font-bold text-orange-500">
//         Criando um produto com ingredientes
//       </h1>
//     ),
//     content: (
//       <div>
//         <h2 className="text-md">
//           Agora arraste o produto &quot;Ovo&quot; para o campo
//           &quot;Ingredientes&quot;
//         </h2>
//       </div>
//     ),
//     target: '.builder',
//     placement: 'center',
//     spotlightClicks: true,
//     disableCloseOnEsc: true,
//     disableOverlayClose: true,
//     disableOverlay: true,
//   },
// ] as Step[];

export const Playground = () => {
  // const { setStepIndex } = useJoyrideContext();

  // const _handleJoyrideCallback = (data: CallBackProps) => {
  //   const { action, index, status, type, step } = data;

  //   const userInteraction = [
  //     '.product-form-name',
  //     '.product-form-unit',
  //     '.product-form-manual-price',
  //     '.product-form-price-calc',
  //     '.price-calc-form-quantity',
  //     '.price-calc-form-unit',
  //     '.price-calc-form-price',
  //     '.price-calc-form-submit',
  //   ];
  //   if (
  //     userInteraction.includes(step?.target as string) &&
  //     type === 'step:after'
  //   ) {
  //     return;
  //   }

  //   const delayed = ['.product-form-unit'];
  //   if (
  //     (action === 'next' || action === 'close') &&
  //     type === 'step:after' &&
  //     !delayed.includes(step?.target as string)
  //   ) {
  //     setTimeout(() => {
  //       setStepIndex(index + 1);
  //     }, 50);
  //   }
  // };

  return (
    <div className="h-full w-full">
      {/* <Joyride
        continuous
        steps={steps}
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
      /> */}
      <ProductForm></ProductForm>
    </div>
  );
};
