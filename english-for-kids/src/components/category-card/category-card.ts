import './category-card.scss';
import Link from '../base/link/link';
import createElement from '../../shared/create-element';
import router from '../base/router';
import ICategoryCardProps from '../../types/category-card-props.type';

export default class CategoryCard extends Link {
  private readonly imageEl: HTMLElement;

  private readonly titleEl: HTMLElement;

  constructor(categoryProps: ICategoryCardProps) {
    super({ classes: ['category-card'], url: categoryProps.handle });

    this.imageEl = createElement('img', ['category-card__img']);
    this.titleEl = createElement('h4', ['category-card__title']);

    this.build(categoryProps);
  }

  private build({ handle, title, image, alt }: ICategoryCardProps): void {
    this.imageEl.setAttribute('src', image);
    this.imageEl.setAttribute('alt', alt);

    this.titleEl.textContent = title;

    this.el.append(this.imageEl, this.titleEl);

    this.attachHandler((e) => {
      e?.preventDefault();
      router.navigate(`category/${ handle }`)
    });
  }
}
