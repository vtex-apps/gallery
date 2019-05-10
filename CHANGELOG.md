# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added

- Add `CategoryPanel` component.

## [3.17.8] - 2019-05-10
### Fixed
- Fixed bug where the extension would break if no title was found.

## [3.17.7] - 2019-05-10
### Fixed
- Not found page being shown without filter navigator when the cause for the
  lack of products is an applied filter.

## [3.17.6] - 2019-05-10
### Fixed
- Fetch more on `LocalQuery` was always fetching 10 more items, and not fetching the next maxItemsPerPage items.

## [3.17.5] - 2019-05-10
### Fixed
- Displays the correct product cluster title, instead of its id.

## [3.17.4] - 2019-05-10
### Fixed
- Refrain from throwing error when LayoutModeSwitcher icon is not found.

## [3.17.3] - 2019-05-10
### Fixed
- Vendas to Ventas in es.json

## [3.17.2] - 2019-05-08
### Fixed
- Use `setQuery` method when selecting a sort by option.

## [3.17.1] - 2019-05-07
### Fixed
- Correctly slugify facets when comparing if they are selected.

## [3.17.0] - 2019-05-07
### Changed
- Generates category to use as prop categoryTree in breadcrumb

## [3.16.2] - 2019-05-07
### Added
- Prop `hideUnavailableItems` to querySchema and use it on `LocalQuery`.

## [3.16.1] - 2019-05-06

## [3.16.0] - 2019-05-06
### Fixed
- Remove the default 'Sort By' option on `OrderBy` component.

## [3.15.5] - 2019-05-06
### Fixed
- Selected filters not accounting for map parameter.

## [3.15.4] - 2019-05-06
### Fixed
- Make `LocalQuery` use productSearchV2 and set default items per page.

## [3.15.3] - 2019-05-06
### Fixed
- Decode gallery title.

## [3.15.2] - 2019-05-03
### Fixed
- Infinite loading on fetch more.

## [3.15.1] - 2019-05-01
### Changed
- Use `recordsFiltered` value from productSearch query.

## [3.15.0] - 2019-04-26
### Changed

- Use filters value instead of encoded link on navigate.

## [3.14.1] - 2019-04-26
### Fixed
- Messages on not found page.

## [3.14.0] - 2019-04-26
### Changed

- Remove usage of `rest` parameter.

## [3.13.4] - 2019-04-26
### Fixed
- undefined error in fetch more.

## [3.13.3] - 2019-04-25
### Fixed
- `TotalProducts` proptype error.

## [3.13.2] - 2019-04-12
### Changed
- Removed option `showTitle` on schema.

## [3.13.1] - 2019-04-10

## [3.13.0] - 2019-04-10
### Added

- Add `search-title` block for displaying category or search term.

## [3.12.14] - 2019-04-10
### Changed
- Using `store-icons` instead of `dreamstore-icons`.

## [3.12.13] - 2019-04-10
### Changed
- Add new CSS handle `filterContent`. 

## [3.12.12] - 2019-04-10
### Fixed

- Error when trying to read properties from facets while loading.

## [3.12.11] - 2019-03-29
### Fixed

- Added the department before each category to pass it to `Breadcrubms`.

## [3.12.10] - 2019-03-29

### Fixed

- Remove Product summary schema from Search Result.

## [3.12.9] - 2019-03-27

### Fixed

- Pass the correct category structure to `Breadcrumbs`.

## [3.12.8] - 2019-03-27

### Fixed

- Fix outside click in mobile `OrderBy` dropdown.

## [3.12.7] - 2019-03-19

### Added

- Resize images to width 500px.

## [3.12.6] - 2019-03-14

### Changed

- Change language files to most generic.

## [3.12.5] - 2019-03-12

### Fixed

- Fix `Gallery` small layout not working properly.

## [3.12.4] - 2019-03-07

### Fixed

- Orderby Button with fixed width in search result grid.

### Added

- Add `react-testing-library` and snapshots.

## [3.12.3] - 2019-02-25

### Fixed

- OrderBy using none instead of invalid value

## [3.12.2] - 2019-02-25

## [3.12.1] - 2019-02-25

### Fixed

- Add default orderBy to relevance

## [3.12.0] - 2019-02-14

### Changed

- Padding between items are now set using tachyons. Also add gap in schema.

## [3.11.9] - 2019-02-14

## [3.11.8] - 2019-02-14

## [3.11.7] - 2019-02-12

### Fixed

- Fix misuse of `layoutMode` prop in desktop view.

### Changed

- Rename `layoutMode` to `mobileLayoutMode` to avoid using it in desktop view.

## [3.11.6] - 2019-02-12

### Fixed

- Normalize the height of `product-summary`.

## [3.11.5] - 2019-02-11

### Changed

- Use flex instead grid in `Gallery` and spaces between `GalleryItems` can be customized.

## [3.11.4] - 2019-02-06

### Fixed

- Fix overflowing items in the `Gallery`.

## [3.11.3] - 2019-02-04

### Fixed

- Fix gallery layout when in mobile mode.

## [3.11.2] - 2019-02-01

## [3.11.1] - 2019-01-31

### Fixed

- Pass `scrollTop` param to list, fix `fetchMore` query and fix layout when more items are loaded.

## [3.11.0] - 2019-01-30

### Changed

- Use icons from `vtex.dreamstore-icons`.

## [3.10.3] - 2019-01-30

### Fixed

- Normalized product sorts SKU's instead of summing their `AvailableQuantity`.

## [3.10.2] - 2019-01-29

### Fixed

- Use correctly the grid API.

## [3.10.1] - 2019-01-29

### Changed

- Centralize gallery when filter-navigator isn't defined.

## [3.10.0] - 2019-01-29

### Added

- Add `order-by` and `total-products` on `search-result` interface.

### Changed

- Now, `filter-navigator` block is an allowed block.

## [3.9.1] - 2019-01-26

### Fixed

- Normalized product now get the sum of skus `AvailableQuantity`.

## [3.9.0] - 2019-01-22

## [3.8.2] - 2019-01-18

### Changed

- Adjust the way to import render-runtime components.

## [3.8.1] - 2019-01-18

## [3.8.0] - 2019-01-18

### Changed

- Update React builder to 3.x.
- Bump vtex.styleguide to 9.x.

## [3.7.0] - 2019-01-17

### Added

- Support to CSS Modules.

## [3.6.1] - 2019-01-11

### Changed

- Add `Container` for adjusting search result to store padding.

## [3.6.0] - 2019-01-09

### Changed

- Bye `pages.json`! Welcome `store-builder`.

## [3.5.0] - 2018-12-21

### Changed

- Use `react-virtualized` to render gallery items.

## [3.4.4] - 2018-12-21

### Fixed

- Search bar items alignment.

## [3.4.3] - 2018-12-21

### Fixed

- Fix Scroll on filter sidebar items.

## [3.4.2] - 2018-12-21

### Fixed

- Show more button must disappear when there is no more products.

## [3.4.1] - 2018-12-20

### Fixed

- Close dropdown sort when click outside of the dropdown box.

## [3.4.0] - 2018-12-19

### Changed

- New layout and behavior of search result filter

## [3.3.0] - 2018-12-18

### Added

- Support to messages builder.

## [3.2.0] - 2018-12-11

### Changed

- Sort option on mobile to a dropdown button.

### Fixed

- Improve code quality in `OrderBy.js`.

## [3.1.0] - 2018-12-10

### Changed

- Product count will be displayed below filter and order buttons.

## [3.0.1] - 2018-12-05

### Fixed

- Fix alignment of `LayoutModeSwitcher`.

## [3.0.0] - 2018-12-04

### Fixed

- Add default behavoir when `querySchema` comes undefined from server.

### Added

- Add new mobile design.
- Not found page component.
- Get switcher layout modes by schema.

### Changed

- Replace tachyons classes with design tokens.
- Paddings and margins to match other components.
- Update loading to use an overlay instead of content loader after initial mount.

## [2.4.1] - 2018-11-22

### Changed

- Changes to search scroll the window to the top of the search result

## [2.4.0] - 2018-11-16

### Changed

- Added better support for use outside a search context.

## [2.3.4] - 2018-11-13

### Changed

- Set search filters not to scroll page when edited

## [2.3.3] - 2018-11-08

### Fixed

- Fix layout on IE and add polyfill for `String.prototype.normalize`.

## [2.3.2] - 2018-11-07

### Fixed

- Typo in the `locales pt-BR`.

## [2.3.1] - 2018-11-06

### Changed

- Only show custom query schema if not inside search context.

## [2.3.0] - 2018-11-06

### Added

- Add field `orderBy` to custom query schema.

## [2.2.0] - 2018-10-31

### Fixed

- Fix slug being modified for every type, instead of only brands.

## [2.1.0] - 2018-10-22

### Added

- Possibility of usage without search query context.

## [2.0.5] - 2018-10-18

### Fixed

- Fix bug when lateral menu was open.

## [2.0.4] - 2018-10-18

### Fixed

- Fix using name of the facet as the slug.

## [2.0.3] - 2018-10-15

### Fixed

- Fix props of breadcrumbs when it has an accented letter.

## [2.0.2] - 2018-10-09

### Fixed

- Change breakpoint of vertical divider in SearchResult in mobile view and add :term to the view + correction of encoded values passed to :term

## [2.0.1] - 2018-10-02

### Changed

- Moved the filter navigator, gallery and product summary to extension points.

## [1.6.0] - 2018-10-02

### Added

- Different viewmode of the result on mobile.

## [1.5.2] - 2018-09-28

### Fixed

- Fix breadcrumb being shown on mobile.

### Removed

- Content loader of filters on mobile.

## [1.5.1] - 2018-09-20

### Fixed

- Fix breadcrumb padding to match the product details.

## [1.5.0] - 2018-09-20

### Fixed

- Removed `ProductSearchContextProvider` state change to avoid unnecessary dependency.

## [1.4.0] - 2018-09-18

### Added

- ShowMore loading option

## [1.3.1] - 2018-09-14

### Fixed

- Fix incorrect specification filter being removed with more than 1 in map.

## [1.3.0] - 2018-09-13

### Added

- Add the possibility to hide the search-result facets

## [1.2.0] - 2018-09-13

### Changed

- Migrate to use range slider from `vtex.styleguide`.

## [1.1.2] - 2018-09-13

### Changed

- Update the `vtex.product-summary` version.

### Fixed

- Filter content loader height and width.

## [1.1.1] - 2018-09-06

### Added

- Content loader on filter facets app.

## [1.1.0] - 2018-09-06

### Added

- `RangeSlider` component.

### Changed

- Updated price range facet to use range component.
- Use `priceRange` query to track the price filter.

## [1.0.1] - 2018-08-28

### Changed

- Upgraded `vtex.styleguide` to version 6.x.

### Fixed

- Checkbox position in chrome.

## [1.0.0] - 2018-08-24

### Changed

- Add mobile design and refactor components.

## [0.6.5] - 2018-08-22

### Changed

- Update specification filter to get slug from link.

### Fixed

- Error on normalize function of the product summary.

## [0.6.4] - 2018-08-08

### Added

- PriceRange filter.

### Changed

- Refactor components.

## [0.6.3] - 2018-08-02

### Changed

- Bump `vtex.styleguide` major version.

## [0.6.2] - 2018-07-31

### Changed

- Refactor filter and update API usage.

## [0.6.1] - 2018-07-24

### Fixed

- Error when trying to access empty array.

## [0.6.0] - 2018-07-24

### Removed

- `facetsQuery` reference.

### Added

- multiselect for search filter.

## [0.5.2] - 2018-07-19

### Fixed

- Remove code dependency with the resolved page path (e.g. `/eletronics/d`).

## [0.5.1] - 2018-07-19

### Fixed

- Remove code dependency with the global runtime.

## [0.5.0] - 2018-7-6

### Added

- Add `SearchFooter` and `SearchResultInfiniteScroll` tests.

### Changed

- Link redirect working based on the `pagesPath` prop.
- Remove GraphQL queries that will be at the [vtex-apps/store](https://github.com/vtex-apps/store/pull/18) project.

### Fixed

- Fix `setContextVariables` function call.
- Fix SearchResult loading state to not trigger the `fetchMore` function in the first query.

## [0.4.0] - 2018-6-20

### Added

- Add the Infinite Scroll feature to the page.
- Add a spinner to be shown when fetching more products.

### Fixed

- Fix `SearchFilter` title internationalization.

## [0.3.0] - 2018-6-14

### Added

- Internationalization to the schema.
- `SearchResult` component
- `SearchFilter` compoenent
- `SelectedFilters` component
- Graphql queries of `search` and `facets`
- Navigation buttons to paginated search.
- Implement SSR

### Changed

- Update `Checkbox` dependency to `vtex.styleguide` app.

## [0.2.0] - 2018-05-11

### Added

- Refactor app to import as default the product-summary app.
- **Orderable gallery** Displays a list of products that can be ordered.
- **Update to the new Pages** Update to new version of Pages.
