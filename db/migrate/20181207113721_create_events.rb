class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title
      t.text :description
      t.string :address
      t.references :user, foreign_key: true
      t.string :photo

      t.timestamps
    end
  end
end
