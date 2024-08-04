import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { useState, useLayoutEffect, FormEvent /*, useRef */ } from 'react';
import { Select } from '../select';
import {
	fontFamilyOptions,
	ArticleStateType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Text } from 'components/text';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState({
		fontFamily: articleState.fontFamilyOption,
		fontSize: articleState.fontSizeOption,
		fontColor: articleState.fontColor,
		backgroundColor: articleState.backgroundColor,
		contentWidth: articleState.contentWidth,
	});

	/*const ref = useRef<HTMLDivElement>(null);*/
	/*useEffect(() => {
		const handleClickOutside = (event) => {
		  if (!ref?.current?.contains(event.target)) {
			setIsMenuOpen(false);
		  }
		 console.log('pf')
		};
		document.addEventListener("mousedown", handleClickOutside);
	  }, [ref]);*/

	/*const openPopup = () => {
		setIsMenuOpen(true);
	  };*/

	const closePopup = () => {
		setIsMenuOpen(false);
	};

	useLayoutEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			console.log(event.clientX);
			if (event.clientX > 614) {
				closePopup();
			}
		};
		if (isMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const formSubmitHandler = (evt: FormEvent) => {
		evt.preventDefault();
		setArticleState({
			...formState,
			fontFamilyOption: formState.fontFamily,
			fontSizeOption: formState.fontSize,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
		});
	};
	const formResetHandler = () => {
		console.log('найс ресет');
		setArticleState({
			...formState,
			fontFamilyOption: fontFamilyOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
			fontSizeOption: fontSizeOptions[0],
		});
		setFormState({
			...formState,
			fontFamily: fontFamilyOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
			fontSize: fontSizeOptions[0],
		});
	};

	return (
		<>
			<ArrowButton onClick={setIsMenuOpen} isMenuOpen={isMenuOpen} />
			<aside
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}>
					<Text size={31} weight={800} uppercase dynamic>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamily}
						options={fontFamilyOptions}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontFamily: selectedOption,
							}))
						}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={formState.fontSize}
						title='Размер шрифта'
						name='Размер шрифта'
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontSize: selectedOption,
							}))
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontColor: selectedOption,
							}))
						}
					/>
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: selectedOption,
							}))
						}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								contentWidth: selectedOption,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
