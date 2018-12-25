import _ from 'lodash';
import menuData from '../menu-data';


/* - Each person must have at least two courses, one of which must be a main. */
export const atLeastTwoAndOneMain = meals => {
  const mainCourses = _.map(menuData.mains, 'id');
  return (_.size(meals) < 2 || _(meals).map('id').intersection(mainCourses).size() < 1) ? 
    'You must have at least two meals with one main' : 
    undefined;
}

export const twoOfSameCourse = course => meals => {
  const courseIds = new Set(_.chain(menuData).get(course).map('id').value());
  return _.sumBy(meals, ({ id }) => courseIds.has(id) ? 1 : 0) > 1;
};

/* - Each diner cannot have more than one of the same course. */
export const noTwoSameCourse = meals => _.overSome(
    [
      twoOfSameCourse('starters'),
      twoOfSameCourse('mains'),
      twoOfSameCourse('desserts')
    ]
  )(meals) ?
  'Only one meal per course is allowed' :
  null;

const cheesecakeId = 11;

/* - There is only one piece of cheesecake left */
export const oneCheeseCake = (meals, users) => _(users)
  .map('meals')
  .flatMap()
  .concat(meals)
  .filter({ id: cheesecakeId })
  .size() > 1 ?
    'Cheesecake is no longer available' :
    null;

const prawnCocktailId = 4;
const salmonFilletId = 7;

/* - Pierre the snobby waiter will not let you have prawn cocktail and salmon fillet in the same meal. */
export const noPrawnAndSalmon = meals => (
  _.sumBy(
    meals,
    ({ id }) => (id === prawnCocktailId || id === salmonFilletId) ? 1 : 0
  ) > 1) ?
  'Prawn Cocktails and Salmon Fillet are not allowed in the same meal' : 
  null;

/* take in a user's new meals and all users */
export const runMenuRules = (meals, users) => _(
  [
    atLeastTwoAndOneMain,
    noTwoSameCourse,
    oneCheeseCake,
    noPrawnAndSalmon
  ]
).map(f => f(meals, users)).filter().value();
