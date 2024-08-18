/**
 * Register usePostDateStatus as a reusable data used in alpinejs `x-data`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*
 *
 * @description Determines the status of a post based on its creation and modification dates.
 *
 * The function follows this process:
 * 1. If `data-created-date` exists and is within `data-within-days`, it returns `'new'`;
 * 2. If `data-created-modified-data` exists and is within `data-within-days`, it returns `'updatedWithin'`;
 * 3. If both `data-created-modified-data` and `data-created-date` exist, it returns `'updated'`;
 * 4. Otherwise, it returns `'normal'`.
 *
 * > [!TIP]
 * > What calling this addEventListener multi-times do?
 * > See [Stackoverflow Anwser](https://stackoverflow.com/questions/10364298/what-does-calling-addeventlister-twice-do)
 *
 * @param {('new' | 'updated' | 'updatedWithin' | 'normal')} [status = 'normal']
 * @param {string} [data-created-date] - HTML data-* attribution for post created date.
 * @param {string} [data-modified-date] - HTML data-* attribution for post modified date.
 * @param {number} [data-within-days] - HTML data-* attribution for . If doesn't exist, default is 7.
 * @returns {('new' | 'updated' | 'updatedWithin' | 'normal')}
 *
 * @example
 * ```astro
 * <div
 *  x-data="usePostDateStatus"
 *  data-created-date="1998-06-17"
 *  data-modified-date="2024-04-01"
 *  data-within-days="7"
 * ></div>
 * ```
 * `usePostDateStatus` will generate `x-data="{status: 'updated'}"`.
 *
 */
document.addEventListener('alpine:init', () => {
  window.Alpine.data('usePostDateStatus', () => ({
    status: 'normal' as 'new' | 'updated' | 'updatedWithin' | 'normal',
    init() {
      this.$nextTick(() => {
        const createdDate = this.$el.dataset.createdDate
        const modifiedDate = this.$el.dataset.modifiedDate
        const withinDays = Number(this.$el.dataset.withinDays)

        const currentDate = new Date()
        const withinDaysAgo = new Date()
        withinDaysAgo.setDate(currentDate.getDate() - (withinDays || 7))

        if (createdDate) {
          const createdDateObj = new Date(createdDate)

          if (createdDateObj >= withinDaysAgo) {
            this.status = 'new'
            return
          }
        }

        if (modifiedDate) {
          const modifiedDateObj = new Date(modifiedDate)

          if (modifiedDateObj >= withinDaysAgo) {
            this.status = 'updatedWithin'
            return
          }

          if (createdDate) {
            if (modifiedDateObj > new Date(createdDate)) {
              this.status = 'updated'
              return
            }
          }
        }

        this.status = 'normal'
      })
    },
  }))
})
