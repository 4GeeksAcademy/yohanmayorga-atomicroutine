"""empty message

Revision ID: 4742fc49bff0
Revises: 072c45c7e849
Create Date: 2023-11-09 02:35:12.390874

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4742fc49bff0'
down_revision = '072c45c7e849'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('todo_item', schema=None) as batch_op:
        batch_op.add_column(sa.Column('author_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'user', ['author_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('todo_item', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('author_id')

    # ### end Alembic commands ###
