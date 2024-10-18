import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6'

export const products = [
	{
		img: '/slide1-min.jpg',
		title: 'Двоярусне ліжко "Аляска" від MebiGrand',
		oldPrice: '90000',
		newPrice: '100000',
		hit: true,
		discont: true,
		newProduct: false,
	},
	{
		img: '/slide2-min.jpg',
		title: 'Двоспальне ліжко «Прованс»',
		oldPrice: '19000',
		newPrice: '20000',
		hit: true,
		discont: false,
		newProduct: true,
	},
	{
		img: '/slide3-min.jpg',
		title: 'Елегантне та стильне ліжко "Верона" від фабрики UMa Ursa Major',
		oldPrice: '29000',
		newPrice: '30000',
		hit: false,
		discont: true,
		newProduct: true,
	},
	{
		img: '/slide4-min.jpg',
		title: 'Елегантне та стильне ліжко "Монро"',
		oldPrice: '39000',
		newPrice: '40000',
	},
	{
		img: '/slide1-min.jpg',
		title: 'Двоярусне ліжко "Аляска" від MebiGrand2',
		oldPrice: '49000',
		newPrice: '50000',
	},
	{
		img: '/slide2-min.jpg',
		title: 'Двоспальне ліжко «Прованс»2',
		oldPrice: '59000',
		newPrice: '60000',
	},
	{
		img: '/slide3-min.jpg',
		title: 'Елегантне та стильне ліжко "Верона" від фабрики UMa Ursa Major2',
		oldPrice: '69000',
		newPrice: '70000',
	},
	{
		img: '/slide4-min.jpg',
		title: 'Елегантне та стильне ліжко "Монро"2',
		oldPrice: '79000',
		newPrice: '80000',
	},
]

export const home = {
	ethaps: {
		title: 'Етапи покупки',
		data: [
			{
				title: 'Вибір',
				text: 'У нашому магазині Ви можете знайти будь-які товари для дому або можете скористатись допомогою наших менеджерів',
			},
			{
				title: 'Узгодження з менеджером',
				text: 'Наші менеджери з радістю підкажуть  варіанти доставки і оплати саме для вас',
			},
			{
				title: 'Відправка',
				text: 'Після узгодження деталей з доставки і оплати наші працівники відправляють товар  в умовлений час',
			},
		],
	},
	advantages: {
		title: 'Чому нас обирають',
		data: [
			{
				title: 'Широкий асортимент',
				text: "Ми пропонуємо великий вибір меблів для будь-яких кімнат та стилів інтер'єру.",
				image: '/Advantages/Assortement.svg',
			},
			{
				title: 'Індивідуальний підхід',
				text: 'Ми завжди готові врахувати ваші побажання та створити меблі на замовлення.',
				image: '/Advantages/Individual.svg',
			},
			{
				title: 'Гарантія якості',
				text: 'Ми завжди готові врахувати ваші побажання та створити меблі на замовлення.',
				image: '/Advantages/Garanty.svg',
			},
			{
				title: 'Доступність',
				text: 'Ми прагнемо пропонувати конкурентоспроможні ціни без шкоди для якості.',
				image: '/Advantages/Availability.svg',
			},
			{
				title: 'Професійна консультація',
				text: 'Наші експерти завжди готові надати кваліфіковану допомогу у виборі меблів, які ідеально підходять саме вам.',
				image: '/Advantages/Professional.svg',
			},
		],
	},
	categories: {
		title: 'Популярні категорії',
		data: [
			{ title: 'Кухні', linkId: 44, image: '/Categories/Cat1.jpg' },
			{ title: 'Шафи', linkId: 39, image: '/Categories/Cat2.jpg' },
			{ title: 'Офісні меблі', linkId: 0, image: '/Categories/Cat3.jpg' },
			{ title: 'Ліжка', linkId: 1, image: '/Categories/Cat2.jpg' },
			{ title: 'Дивани', linkId: 4, image: '/Categories/Cat1.jpg' },
			{ title: 'Комоди і тумби', linkId: 17, image: '/Categories/Cat3.jpg' },
		],
	},
	hero: {
		sidebar: [
			{
				id: 4,
				text: 'Дивани',
				image: '/icons/devan.svg',
			},
			{
				id: 1,
				text: 'Ліжка',
				image: '/icons/ligka.svg',
			},
			{
				id: 11,
				text: 'Крісла',
				image: '/icons/kreslo.svg',
			},
			{
				id: 17,
				text: 'Комоди і тумби',
				icon: '',
			},
			{
				id: 22,
				text: 'Стільці і табурети',
				icon: '',
			},
			{
				id: 27,
				text: 'Матраци та аксесуари',
				icon: '',
			},
			{
				id: 33,
				text: 'Столи',
				icon: '',
			},
			{
				id: 39,
				text: 'Шкафи та полиці',
				icon: '',
			},
			{
				id: 44,
				text: 'Кухні',
				icon: '',
			},
			{
				id: 48,
				text: 'Стінки і гарнітури',
				icon: '',
			},
		],
		slider: [
			{
				text: 'Купуйте будь-яке крісло або диван і отримайте подушку у подарунок ',
				imgSrc: '/delete/slide.jpg',
			},
			{
				text: 'Купуйте будь-яке крісло або диван і отримайте подушку у подарунок',
				imgSrc: '/delete/slide.jpg',
			},
			{
				text: 'Купуйте будь-яке крісло або диван і отримайте подушку у подарунок',
				imgSrc: '/delete/slide.jpg',
			},
			{
				text: 'Купуйте будь-яке крісло або диван і отримайте подушку у подарунок',
				imgSrc: '/delete/slide.jpg',
			},
			{
				text: 'Купуйте будь-яке крісло або диван і отримайте подушку у подарунок',
				imgSrc: '/delete/slide.jpg',
			},
		],
	},
	newProduct: { title: 'Нові товари' },
	interesrProduct: { title: 'Також вас може зацікавити' },
}

export const ad = [
	{
		text: 'Акція! З 15 по 24 липня на групи комодів, тумб взуття та передпокої!',
	},
	{
		text: 'Акція! З 15 по 24 липня на групи комодів, тумб взуття та передпокої!',
	},
	{
		text: 'Акція! З 15 по 24 липня на групи комодів, тумб взуття та передпокої!',
	},
]
export const header = [
	{ text: 'Каталог' },
	{ text: 'Корзина' },
	{
		text: 'Магазини',
		magazine: [
			{
				town: 'м.Балта, Одеська обл.',
				address: 'вул. Любомирська, 163',
				time: 'ПН - СБ 08:00 - 18:00 НД 08:00 - 16:00',
			},
			{
				town: 'м.Подільск, Одеська обл.',
				address: 'вул. Соборна, 194',
				time: 'ПН - СБ 10:00 - 20:00',
			},
			{
				town: 'м.Одеса',
				address: 'вул. Чорноморського козацтва, 1 А',
				time: 'ПН - НД 08:00 - 18:00 НД 08:00 - 16:00',
			},
			{
				town: 'м.Первомайськ, Миколаївська обл.',
				address: 'вул. Одеська, 48 А',
				time: 'ПН - НД 09:00 - 18:00 ',
			},
		],
	},
	{
		text: 'Контактні телефони',
		contact: [{ link: 'tel:+380951277643', tel: '095-12-77-643' }],
	},
	{
		text: 'Мова',
		lang: [
			{ value: 'ua', text: 'UA' },
			{ value: 'ru', text: 'RU' },
		],
	},
	{ text: 'Пошук...' },
]
export const footer = [
	{
		title: 'Контакти:',
		contacts: [
			{
				title: 'Відділ продажу',
				text: '+38 (095) 127 76 43',
				link: 'tel:+380951277643',
			},
			{
				title: 'Режим роботи',
				text: '08:00 - 18:00 ПН - СБ 08:00 - 16:00 ВС',
			},
			{
				title: 'Зворотній зв’язок',
				text: 'info@tera-mebly.com',
				link: 'mailto:info@tera-mebly.com',
			},
		],
	},
	{
		title: 'Інформація:',
		info: [
			{ text: 'Про нас', link: '/' },
			{ text: 'Доставка і Оплата', link: '/delivery' },
			{ text: 'Гарантія та Повернення', link: '/warranty' },
		],
	},
	{
		title: 'Ми у соцмережах:',
		socials: [
			{ icon: FaFacebook, link: '/' },
			{ icon: FaInstagram, link: '/' },
			{ icon: FaTiktok, link: '/' },
			{ icon: FaYoutube, link: '/' },
		],
	},
]

export const warranty = [
	{
		title: 'Гарантія та Повернення',
		content: [
			"Усі товари в нашому магазині мають офіційну гарантію від виробника. Гарантійний термін для меблів, придбаних у нас, становить від 12 місяців, залежно від політики виробника. Підтвердження гарантійних зобов'язань послуг гарантійний талон виробника або гарантійний талон від інтернет-магазину «Тера Меблі»",
			'Покупець повинен перевірити цілісність скла та дзеркала при отриманні меблів. У разі пошкодження упаковки слід перевірити кількість і комплектність вкладень.Гарантійне обслуговування меблів діє, якщо меблі зібрані майстрами мебельного магазину «Тера Меблі»',
		],
	},
	{
		title: 'При самостійній збірці',
		content: [
			'Якщо покупець самостійно збирає меблі, необхідно перевірити всі деталі на наявність дефектів (відколів, подряпин). У разі виявлення дефекту слід негайно призупинити збірку, остання частина меблів зі слідами збірки не підлягає поверненню або обміну. Зберігайте фабричну упаковку до завершення збірки, заміна дефектних деталей здійснюється тільки для наявності фабричної упаковки.',
			"Гарантія анулюється, якщо деталь уже була встановлена, або є явні ознаки її використання, наприклад, вкручений гвинт чи прорізане відвір. У разі виявлення дефекту зв'яжіться з менеджером магазину. Зберігайте товарний чек, супровідний документ та маркувальний лист на упаковці до завершення гарантійного терміну.",
			'Рекламація приймається лише за наявність виробу або його елементів в «оригінальній упаковці». У разі недотримання цих вимог, претензії щодо рекламацій не приймаються. Рекламації, які виникли через неправильну збірку, доставку або експлуатацію, усуваються за рахунок покупця. Термін виготовлення рекламних деталей становить близько 20 робочих днів, але в деяких виробників вдається досягти 30 робочих днів.',
			"Гарантійні зобов'язання <span className='font-semibold'>не</span> розширюються, якщо:",
			[
				'порушено правила та умови експлуатації меблів;',
				'встановлення та ремонт меблів використовувалися покупцем самостійно;',
				'меблі пошкоджені внаслідок дії домашніх тварин, вогню, агресивних рідин, а також ознак недбалого поводження з товаром;',
				'змінена конструкція виробу або його комплектуючих покупцем;',
				'завершився гарантійний термін;',
				'є дефекти, про які було повідомлено покупця до продажу, та за наявність яких було надано знижку.',
			],
		],
	},
	{
		title: 'Повернення товару',
		content: [
			'Покупець має право протягом 14 днів обмінюватися на аналогічний або	повернути отриманий товар (меблі), якщо він не підходить за формою, 	кольором, розміром або з інших причин, які заважають використанню	його за призначенням.',
			'Обмін товару або повернення коштів можливе за умов:',
			[
				'товар не використовувався і не збиралося;',
				'збережений товарний вигляд, споживчі властивості, фабричні ярлики;',
				'упаковка не пошкоджена;',
				'є товарний чек, виданий разом з товаром.',
			],
			'Вам буде відмовлено в заміні товару або коштів, якщо:',
			[
				'товар виготовлено під індивідуальне замовлення (зокрема, з обраною	тканиною, нестандартними розмірами, кольорами тощо);',
				'з моменту отримання товару минуло більше 14 днів;',
				'товар не є новим, тобто був зібраний;',
				'при перевірці якості перевірено ознаки стороннього вручення (збірка, монтаж, пошкодження або пошкодження оригінальної упаковки).',
			],
			'У разі відмови від замовлення покупець сплачує вартість доставки в	обидва боки.',
		],
	},
]

export const payment = {
	title: 'Оплата',
	data: [
		{
			title: 'У наших магазинах (готівкою / карткою)',
			content: [
				[
					'Готівка в касу магазину;',
					'Оплата карткою через POS термінал;',
					'Оплата готівкою чи карткою при накладному платежі, під час отримання товару на поштовому відділенні;',
					'Комісію за банківський переказ або витрати, пов’язані з пересиланням післяплати кур’єрською службою (Нова Пошта), оплачує покупець.',
				],
			],
		},
		{
			title: 'За банківськими реквізитами',
			content: [
				[
					'Ви отримуєте рахунок-фактуру, згідно з яким можна оплатити замовлення через будь-який банк.',
				],
			],
		},
		{
			title: 'Через термінал самообслуговування',
			content: [
				['Приватбанк або IBox, за реквізитами наданими нашим Менеджером'],
			],
		},
		{
			title: 'Кредит і розстрочка',
			content: [['Оплата частинами від ПриватБанк', 'Кредит ПумбБанк']],
		},
	],
}

export const delivery = {
	title: 'Доставка',
	data: [
		{
			title: '',
			content: [
				"<span className='font-semibold'>Доставка та збирання Меблів</span>, придбаних в наших офлайн магазинах відбувається по домовленості з персоналом магазину, під час якого обговорюються такі моменти:",
				[
					'адреса доставки товару;',
					'час і дата доставки та збирання товару;',
					'уточнюється вартість доставки та збирання товару.',
				],
				'*Ми рекомендуємо доручити збирання меблів нашим професійним збиральникам, які швидко та якісно зберуть Ваші меблі.',
			],
		},
		{
			title: '',
			content: [
				"<span className='font-semibold'>Доставка та збирання Меблів</span>, варіантах:",
				[
					'доставка з нашого офлайн магазину, якщо це територіально можливо (процедура показана в попередньому дописі);',
					'доставка за допомогою поштових служб таких як Нова Пошта – по їх тарифах. Всі умови доставки та збирання меблів узгоджуються з менеджером нашого Інтернет магазину.',
				],
				'*Ми рекомендуємо доручити збирання меблів нашим професійним збиральникам, які швидко та якісно зберуть Ваші меблі.',
			],
		},
	],
}
