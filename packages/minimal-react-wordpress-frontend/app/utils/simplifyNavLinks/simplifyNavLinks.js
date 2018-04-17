const simplifyNavLinks = navLinks => navLinks.map(navLink => ({
  title: navLink.title,
  url: navLink.object === 'page'
    ? '/page/' + navLink.object_id
    : navLink.url,
}))

export default simplifyNavLinks
