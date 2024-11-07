import { delivery, payment } from '@/constants'
import RenderSections from '@/helpers'
import css from './delivery.module.css'
import { CrumbsLinks } from '@/components/shared/CrumbsLinks'

export default function Delivery() {
	return (
		<div>
			<CrumbsLinks customBreadcrumb={[{ name: 'Доставка та оплата' }]} />
			<div className={css.delivery}>
				<h2 className={css.title}>{delivery.title}</h2>
				<div className={css.container}>
					<RenderSections data={delivery.data} />
				</div>
				<h2 className={css.title}>{payment.title}</h2>
				<div className={css.container}>
					<RenderSections data={payment.data} />
				</div>
			</div>
		</div>
	)
}
