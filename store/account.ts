import { atom } from 'recoil';

export const accountState = atom({
	key: 'accountState', // unique ID (with respect to other atoms/selectors)
	default: '', // valeur par défaut (alias valeur initials)
});
