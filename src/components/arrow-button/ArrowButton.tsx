import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
/*import clsx from 'clsx';*/

/** Функция для обработки открытия/закрытия формы */
interface OnClick {
	onClick?: (state: boolean) => void;
	isMenuOpen?: boolean;
}

export const ArrowButton = ({ onClick, isMenuOpen }: OnClick) => {
	const onClickMouse = () => {
		onClick?.(!isMenuOpen);
		console.log('клик');
	};

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${
				isMenuOpen ? styles.container_open : ''
			}`}
			onClick={() => {
				onClickMouse();
			}}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${isMenuOpen ? styles.arrow_open : ''} `}
			/>
		</div>
	);
};
