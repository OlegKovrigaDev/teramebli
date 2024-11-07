import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6'

export default {
	home: {
		ethaps: {
			title: 'Этапы покупки',
			data: [
				{
					title: 'Выбор',
					text: 'В нашем магазине вы можете найти любые товары для дома или можете воспользоваться помощью наших менеджеров',
				},
				{
					title: 'Согласование с менеджером',
					text: 'Наши менеджеры с радостью подскажут варианты доставки и оплаты именно для вас',
				},
				{
					title: 'Отправка',
					text: 'После согласования деталей доставки и оплаты наши сотрудники отправляют товар в условленное время',
				},
			],
		},
		advantages: {
			title: 'Почему нас выбирают',
			data: [
				{
					title: 'Широкий ассортимент',
					text: 'Мы предлагаем большой выбор мебели для любых комнат и стилей интерьера.',
					image: '/Advantages/Assortement.svg',
				},
				{
					title: 'Индивидуальный подход',
					text: 'Мы всегда готовы учесть ваши пожелания и создать мебель на заказ.',
					image: '/Advantages/Individual.svg',
				},
				{
					title: 'Гарантия качества',
					text: 'Мы всегда готовы учесть ваши пожелания и создать мебель на заказ.',
					image: '/Advantages/Garanty.svg',
				},
				{
					title: 'Доступность',
					text: 'Мы стремимся предлагать конкурентоспособные цены без ущерба для качества.',
					image: '/Advantages/Availability.svg',
				},
				{
					title: 'Профессиональная консультация',
					text: 'Наши эксперты всегда готовы предоставить квалифицированную помощь в выборе мебели, которая идеально подходит именно вам.',
					image: '/Advantages/Professional.svg',
				},
			],
		},
		categories: {
			title: 'Популярные категории',
			data: [
				{ title: 'Кухни', linkId: 44, image: '/Categories/Cat1.jpg' },
				{ title: 'Шкафы', linkId: 39, image: '/Categories/Cat2.jpg' },
				{ title: 'Столы', linkId: 33, image: '/Categories/Cat3.jpg' },
				{ title: 'Кровати', linkId: 1, image: '/Categories/Cat4.jpg' },
				{ title: 'Диваны', linkId: 4, image: '/Categories/Cat6.jpg' },
				{ title: 'Комоды и тумбы', linkId: 17, image: '/Categories/Cat5.jpg' },
			],
		},
		hero: {
			sidebar: [
				{ id: 4, text: 'Диваны', icon: '/icons/sofas.svg' },
				{ id: 1, text: 'Кровати', icon: '/icons/beds.svg' },
				{ id: 11, text: 'Кресла', icon: '/icons/soft-furniture.svg' },
				{
					id: 17,
					text: 'Комоды и тумбы',
					icon: '/icons/chests-of-drawers-and-cabinets.svg',
				},
				{ id: 22, text: 'Стулья и табуреты', icon: '/icons/office.svg' },
				{ id: 27, text: 'Матрасы и аксесуары', icon: '/icons/mattresses.svg' },
				{ id: 33, text: 'Столы', icon: '/icons/table.svg' },
				{ id: 39, text: 'Шкафы и полки', icon: '/icons/cabinets.svg' },
				{ id: 44, text: 'Кухни', icon: '/icons/cusine.svg' },
				{
					id: 48,
					text: 'Стенки и гарнитуры',
					icon: '/icons/walls-and-headsets.svg',
				},
			],
			slider: [
				{
					text: 'Купите любое кресло или диван и получите подушку в подарок',
					imgSrc: '/delete/slide.jpg',
				},
			],
		},
		newProduct: { title: 'Новые товары' },
		interesrProduct: { title: 'Также вас может заинтересовать' },
	},

	ad: [
		{
			text: 'Акция! С 15 по 24 июля на группы комодов, тумб обуви и прихожие!',
		},
	],

	header: [
		{ text: 'Каталог' },
		{ text: 'Корзина' },
		{
			text: 'Магазины',
			magazine: [
				{
					town: 'г.Балта, Одеская обл.',
					address: 'ул. Любомирська, 163',
					time: 'ПН - СБ 08:00 - 18:00 ВС 08:00 - 16:00',
				},
			],
		},
		{
			text: 'Контактные телефоны',
			contact: [{ link: 'tel:+380951277643', tel: '095-12-77-643' }],
		},
		{
			text: 'Язык',
			lang: [
				{ value: 'ua', text: 'UA' },
				{ value: 'ru', text: 'RU' },
			],
		},
		{ text: 'Поиск...' },
	],

	footer: [
		{
			title: 'Контакты:',
			contacts: [
				{
					title: 'Отдел продаж',
					text: '+38 (095) 127 76 43',
					link: 'tel:+380951277643',
				},
				{
					title: 'Режим роботы',
					text: '08:00 - 18:00 ПН - СБ 08:00 - 16:00 ВС',
				},
				{
					title: 'Обратная связь',
					text: 'info@tera-mebly.com',
					link: 'mailto:info@tera-mebly.com',
				},
			],
		},
		{
			title: 'Информация:',
			info: [
				{ text: 'О нас', link: '/about' },
				{ text: 'Доставка и Оплата', link: '/delivery' },
				{ text: 'Гарантии и Возврат', link: '/warranty' },
			],
		},
		{
			title: 'Мы в соцсетях:',
			socials: [
				{
					icon: FaFacebook,
					link: 'https://www.facebook.com/profile.php?id=61553919922208',
				},
				{
					icon: FaInstagram,
					link: 'https://www.instagram.com/balta.mebli_fortecia/',
				},
				{ icon: FaTiktok, link: 'https://www.tiktok.com/@mebli.balta' },
				{ icon: FaYoutube, link: '/' },
			],
		},
	],

	warranty: [
		{
			title: 'Гарантия и Возврат',
			content: [
				'Все товары в нашем магазине имеют официальную гарантию от производителя...',
			],
		},
	],

	payment: {
		title: 'Оплата',
		data: [
			{
				title: 'В наших магазинах (наличными/картой)',
				content: [
					['Наличные в кассу магазина;', 'Оплата картой через POS терминал;'],
				],
			},
		],
	},

	delivery: {
		title: 'Доставка',
		data: [
			{
				title: '',
				content: [
					"<span className='font-semibold'>Доставка и сборка Мебели</span>, приобретенных в наших оффлайн магазинах...",
				],
			},
		],
	},

	about: {
		title: 'O нас',
		data: [
			{
				title: '',
				content: ['Добро пожаловать в интернет-магазин "Тера Мебель"...'],
			},
		],
	},

	orders: [
		{ label: 'Введите свое имя', placeholder: 'Имя', name: 'firstName' },
	],

	radioOptions: {
		delivery: [
			{ label: 'Доставка по городу', value: 'cityDelivery' },
			{ label: 'Самовывоз', value: 'pickup' },
			{ label: 'Новая почта', value: 'novaPoshta' },
			{ label: 'Meest', value: 'meest' },
		],
		payment: [
			{ label: 'Наличными', value: 'cash' },
			{ label: 'Картой', value: 'card' },
			{ label: 'Безналичный расчет', value: 'nonCash' },
			{ label: 'Кредит/Рассрочка', value: 'credit' },
		],
	},
}
