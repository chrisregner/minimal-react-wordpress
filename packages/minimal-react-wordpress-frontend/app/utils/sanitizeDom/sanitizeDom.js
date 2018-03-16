import createDOMPurify from 'dompurify'

const { sanitize } = createDOMPurify(global.window)

export default sanitize
