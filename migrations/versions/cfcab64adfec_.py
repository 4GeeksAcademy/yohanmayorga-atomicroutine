"""empty message

Revision ID: cfcab64adfec
Revises: 643eabf982d8
Create Date: 2023-10-29 20:54:14.565585

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cfcab64adfec'
down_revision = '643eabf982d8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('journal', schema=None) as batch_op:
        batch_op.alter_column('text',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
        batch_op.alter_column('color',
               existing_type=sa.VARCHAR(length=80),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('journal', schema=None) as batch_op:
        batch_op.alter_column('color',
               existing_type=sa.VARCHAR(length=80),
               nullable=False)
        batch_op.alter_column('text',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)

    # ### end Alembic commands ###
