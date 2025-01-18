import { CHAR } from 'sequelize'
import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

// https://sequelize.org/docs/v7/models/data-types/
@Table({
    tableName: 'products'
})

class Product extends Model {
    @Column({
        type: DataType.STRING(100)
    }
    )
    name: string

    @Column({
        type: DataType.FLOAT(6, 2)
    })
    price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    availability: boolean
}

export default Product