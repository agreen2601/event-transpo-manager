# Generated by Django 3.0.5 on 2020-08-12 03:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('trackerapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Area',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'area',
                'verbose_name_plural': 'areas',
            },
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('area', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trackerapp.Area')),
            ],
            options={
                'verbose_name': 'event',
                'verbose_name_plural': 'events',
            },
        ),
    ]
