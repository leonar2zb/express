describe('Primer test', () => {

    it('Verificar 1+1 sea 2', () => {
        expect(1 + 1).toBe(2)
    })

    it('Verificar 1+1 no sea 3', () => {
        expect(1 + 1).not.toBe(3)
    })

})