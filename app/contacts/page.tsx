'use client'
import { Accord } from '@/components/shared/accord'
import { CrumbsLinks } from '@/components/shared/CrumbsLinks'
import { contactsData } from '@/constants'
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa6'

const contacts = () => {
	const [activeAccordion, setActiveAccordion] = useState<2 | 3 | 4 | 5>(2)

	return (
		<div>
			<CrumbsLinks customBreadcrumb={[{ name: 'Контакти' }]} />
			<div className='pt-10 pb-20 flex flex-col items-center xl:items-start xl:flex-row xl:justify-between gap-10'>
				<div className='flex flex-col w-full xl:min-w-[592px] bg-white'>
					{contactsData.map(
						({ id, title, phone, type, email, icons, worktime, maps }) => (
							<Accord
								key={id}
								title={title}
								onToggle={() => setActiveAccordion(id as 2 | 3 | 4 | 5)}
							>
								<div className='flex flex-col gap-2 w-full'>
									<div className='flex justify-between flex-wrap text-[18px]'>
										<div className='flex flex-col gap-4'>
											<Link href={`tel:${phone}`} className='flex gap-2'>
												<Phone size={20} />
												<span className='font-semibold'>{phone}</span>
											</Link>
											{type === 'email' && (
												<Link href={`mailto:${email}`} className='flex gap-2'>
													<Mail size={20} />
													<span className='font-semibold underline'>
														{email}
													</span>
												</Link>
											)}
											{type === 'social' && icons && (
												<div className='flex gap-6'>
													{icons.map((icon, index) => (
														<span key={`icon-${id}-${index}`}>
															{icon === FaFacebook && <FaFacebook size={20} />}
															{icon === FaInstagram && (
																<FaInstagram size={20} />
															)}
															{icon === FaTiktok && <FaTiktok size={20} />}
														</span>
													))}
												</div>
											)}
										</div>
										<div className='flex flex-col gap-4'>
											<p className='font-semibold mt-4'>Графік роботи</p>
											<div className='flex flex-col gap-4 items-end'>
												<p>
													ПН - СБ{' '}
													<span className='font-semibold'>{worktime?.[0]}</span>
												</p>
												{worktime?.[1] && (
													<p>
														ВС{' '}
														<span className='font-semibold'>
															{worktime?.[1]}
														</span>
													</p>
												)}
											</div>
										</div>
										{maps && (
											<div className='w-full flex flex-col xl:hidden'>
												<h2 className='font-bold my-2'>Ми на карті:</h2>
												<p className='mb-4'>{maps?.[1]}</p>
												<iframe
													src={maps?.[0]}
													suppressHydrationWarning
													width='100%'
													height='267'
													loading='lazy'
												/>
											</div>
										)}
									</div>
								</div>
							</Accord>
						)
					)}
				</div>
				{contactsData
					.filter((_, i) => i + 1 === activeAccordion)
					.map(({ maps }, index) => (
						<div
							key={`map-${activeAccordion}-${index}`}
							className='flex-col max-w-[584px] xl:min-w-[584px] hidden xl:flex'
						>
							<h2 className='font-bold mb-2'>Ми на карті:</h2>
							<p className='mb-4'>{maps?.[1]}</p>
							<iframe src={maps?.[0]} height='483' loading='lazy'></iframe>
						</div>
					))}
			</div>
		</div>
	)
}

export default contacts
