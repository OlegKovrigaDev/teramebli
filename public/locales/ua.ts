import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6'

export default {
	home: {
		ethaps: {
			title: 'Етапи покупки',
			data: [
				{
					title: 'Вибір',
					text: 'У нашому магазині Ви можете знайти будь-які товари для дому або можете скористатись допомогою наших менеджерів',
				},
				{
					title: 'Узгодження з менеджером',
					text: 'Наші менеджери з радістю підкажуть варіанти доставки і оплати саме для вас',
				},
				{
					title: 'Відправка',
					text: 'Після узгодження деталей з доставки і оплати наші працівники відправляють товар в умовлений час',
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
				{ title: 'Столи', linkId: 33, image: '/Categories/Cat3.jpg' },
				{ title: 'Ліжка', linkId: 1, image: '/Categories/Cat4.jpg' },
				{ title: 'Дивани', linkId: 4, image: '/Categories/Cat6.jpg' },
				{ title: 'Комоди і тумби', linkId: 17, image: '/Categories/Cat5.jpg' },
			],
		},
		hero: {
			sidebar: [
				{ id: 4, text: 'Дивани', icon: '/icons/sofas.svg' },
				{ id: 1, text: 'Ліжка', icon: '/icons/beds.svg' },
				{ id: 11, text: 'Крісла', icon: '/icons/soft-furniture.svg' },
				{
					id: 17,
					text: 'Комоди і тумби',
					icon: '/icons/chests-of-drawers-and-cabinets.svg',
				},
				{ id: 22, text: 'Стільці і табурети', icon: '/icons/office.svg' },
				{ id: 27, text: 'Матраци та аксесуари', icon: '/icons/mattresses.svg' },
				{ id: 33, text: 'Столи', icon: '/icons/table.svg' },
				{ id: 39, text: 'Шкафи та полиці', icon: '/icons/cabinets.svg' },
				{ id: 44, text: 'Кухні', icon: '/icons/cusine.svg' },
				{
					id: 48,
					text: 'Стінки і гарнітури',
					icon: '/icons/walls-and-headsets.svg',
				},
			],
			slider: [
				{
					text: 'Купуйте будь-яке крісло або диван і отримайте подушку у подарунок',
					imgSrc: '/delete/slide.jpg',
				},
			],
		},
		newProduct: { title: 'Нові товари' },
		interesrProduct: { title: 'Також вас може зацікавити' },
	},

	ad: [
		{
			text: 'Акція! З 15 по 24 липня на групи комодів, тумб взуття та передпокої!',
		},
	],

	header: [
		{ text: 'Каталог' },
		{ text: 'Кошик' },
		{
			text: 'Магазини',
			magazine: [
				{
					town: 'м.Балта, Одеська обл.',
					address: 'вул. Любомирська, 163',
					time: 'ПН - СБ 08:00 - 18:00 НД 08:00 - 16:00',
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
	],

	footer: [
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
				{ text: 'Про нас', link: '/about' },
				{ text: 'Доставка і Оплата', link: '/delivery' },
				{ text: 'Гарантія та Повернення', link: '/warranty' },
			],
		},
		{
			title: 'Ми у соцмережах:',
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
			title: 'Гарантія та Повернення',
			content: [
				'Усі товари в нашому магазині мають офіційну гарантію від виробника...',
			],
		},
	],

	payment: {
		title: 'Оплата',
		data: [
			{
				title: 'У наших магазинах (готівкою / карткою)',
				content: [
					['Готівка в касу магазину;', 'Оплата карткою через POS термінал;'],
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
					"<span className='font-semibold'>Доставка та збирання Меблів</span>, придбаних в наших офлайн магазинах...",
				],
			},
		],
	},

	about: {
		title: 'Про нас',
		data: [
			{
				title: '',
				content: ['Ласкаво просимо до інтернет-магазину "Тера Меблі"...'],
			},
		],
	},

	orders: [
		{ label: 'Введіть своє ім’я', placeholder: 'Ім’я', name: 'firstName' },
	],

	radioOptions: {
		delivery: [
			{ label: 'Доставка по місту', value: 'cityDelivery' },
			{ label: 'Самовивіз', value: 'pickup' },
			{ label: 'Нова пошта', value: 'novaPoshta' },
			{ label: 'Meest', value: 'meest' },
		],
		payment: [
			{ label: 'Готівкою', value: 'cash' },
			{ label: 'Карткою', value: 'card' },
			{ label: 'Безготівковий розрахунок', value: 'nonCash' },
			{ label: 'Кредит/Розстрочка', value: 'credit' },
		],
	},
}
