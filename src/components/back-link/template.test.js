/* eslint-env jest */

const { axe } = require('jest-axe')

const { render, getExamples } = require('../../../lib/jest-helpers')

const examples = getExamples('back-link')

describe('back-link component', () => {
  it('default example passes accessibility tests', async () => {
    const $ = render('back-link', examples.default)

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it.skip('fails to render if the required fields are not included', () => {
    // TODO: href is a required field but the component does not error,
    // when it is not passed
    expect(() => {
      render('back-link', {
        text: 'Example'
      })
    }).toThrow()
  })

  it('renders the default example with an anchor, href and text correctly', () => {
    const $ = render('back-link', examples.default)

    const $component = $('.govuk-back-link')
    expect($component.get(0).tagName).toEqual('a')
    expect($component.attr('href')).toEqual('#')
    expect($component.text()).toEqual('Back')
  })

  it('renders classes correctly', () => {
    const $ = render('back-link', {
      classes: 'app-back-link--custom-class',
      href: '#',
      html: '<b>Back</b>'
    })

    const $component = $('.govuk-back-link')
    expect($component.hasClass('app-back-link--custom-class')).toBeTruthy()
  })

  it('renders custom text correctly', () => {
    const $ = render('back-link', {
      href: '#',
      text: 'Home'
    })

    const $component = $('.govuk-back-link')
    expect($component.html()).toEqual('Home')
  })

  it('renders escaped html when passed to text', () => {
    const $ = render('back-link', {
      href: '#',
      text: '<b>Home</b>'
    })

    const $component = $('.govuk-back-link')
    expect($component.html()).toEqual('&lt;b&gt;Home&lt;/b&gt;')
  })

  it('renders html correctly', () => {
    const $ = render('back-link', {
      href: '#',
      html: '<b>Back</b>'
    })

    const $component = $('.govuk-back-link')
    expect($component.html()).toEqual('<b>Back</b>')
  })

  it('renders default text correctly', () => {
    const $ = render('back-link', {
      href: '#'
    })

    const $component = $('.govuk-back-link')
    expect($component.html()).toEqual('Back')
  })

  it('renders attributes correctly', () => {
    const $ = render('back-link', {
      attributes: {
        'data-test': 'attribute',
        'aria-label': 'Back to home'
      },
      href: '#',
      html: 'Back'
    })

    const $component = $('.govuk-back-link')
    expect($component.attr('data-test')).toEqual('attribute')
    expect($component.attr('aria-label')).toEqual('Back to home')
  })
})
