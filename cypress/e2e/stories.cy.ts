describe('Stories App', () => {
  beforeEach(() => {
    cy.viewport(639, 750)
    
    cy.visit('/')
    
    cy.intercept('GET', '/stories.json', {
      fixture: 'stories.json'
    })
  })

  it('should display the story list', () => {
    cy.get('.story-list').should('exist')
    cy.get('.story-button').should('have.length.at.least', 1)
  })

  it('should open a story when clicking on a user', () => {
    cy.get('.story-button').first().click()
    cy.get('.story-view').should('exist')
    cy.get('.story-image').should('be.visible')
  })

  it('should navigate through stories using tap zones', () => {
    cy.get('.story-button').first().click()
    
    cy.get('.story-image').invoke('attr', 'src').as('firstImage')
    
    cy.get('.story-view').click('right')
    
    cy.get('.story-image').invoke('attr', 'src').should('not.eq', '@firstImage')
  })

  it('should close story view when clicking close button', () => {
    cy.get('.story-button').first().click()
    cy.get('.close-button').click()
    cy.get('.story-view').should('not.exist')
  })

  it('should automatically advance to next story', () => {
    cy.get('.story-button').first().click()
    
    cy.get('.story-image').invoke('attr', 'src').as('initialImage')
    
    cy.wait(5000)
    
    cy.get('.story-image')
      .invoke('attr', 'src')
      .should('not.eq', '@initialImage')
  })
}) 
