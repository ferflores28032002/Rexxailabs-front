describe("Home Page", () => {
  it("checks the main title, description, and register button functionality", () => {
    cy.visit("/");

    // Verificar el título principal
    cy.get("#cypress-title-home").contains("con Rexxailabs");

    // Verificar la descripción principal
    cy.get("#cypress-description-home").contains(
      "¡Mantén toda la información de tus clientes organizada y siempre a mano! Con Rexxailabs, puedes registrar, actualizar y acceder rápidamente a cada detalle importante. Todo pensado para facilitar tu gestión y mejorar tu productividad."
    );

    // Verificar que el botón de registro esté visible y redirige correctamente
    cy.contains("Registrate →").should("be.visible").click();
    cy.url().should("include", "/register");
  });
});
