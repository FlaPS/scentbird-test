### Start ###
```npm i```
```npx lerna bootstrap```
```cd ./packages/scentbird```
```npm run dev```

### My comments for the task source ###

1. You have set font-weight to 250 in some cases, such values are not supported in CSS
http://htmldog.com/references/css/properties/font-weight/
Hence I can't provide you pixel perfect matching implementation

2. I tried organize design system with all the fonts and icons in storybook, 
but looks like you have slightly different colors ( like #222222 and #333333 with different pages, other styles are exactly same). 
Looks lie there is no sense to set up different but unrecognizable for an eye styles.

3. As I can see each purchase option could have unique image. That's why PurchaseOptionVO type has  "url" property 

4. Why I do not use css modules:
- Too much files, I wonna see components and styles at the same screen  in case there is no business logic.
- Type system can recornize nothing into css/sass/less files. It's the biggest valley of a typos/errors, hard and disappointing to fix them
- The css toolchain is very poor for now in compare of css in JS techniques. For example I could not control the behaviour of separated styles in runtime.

5 I didn't implement comboboxes, I think it's a good task for a whole day because of:
- binded zip/postal codes, 
- different behaviour on devices, 
- virtualization of the lists

# TODO #
- Clean-up dependencies
- Separate form logic into isolated packages
