# Generated by Django 3.0.5 on 2020-08-12 03:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Date',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
            ],
            options={
                'verbose_name': 'date',
                'verbose_name_plural': 'dates',
            },
        ),
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('phone_number', models.CharField(max_length=50)),
                ('isLocal', models.BooleanField(default=False)),
                ('notes', models.CharField(max_length=250)),
            ],
            options={
                'verbose_name': 'driver',
                'verbose_name_plural': 'drivers',
            },
        ),
        migrations.CreateModel(
            name='Route',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('color', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'route',
                'verbose_name_plural': 'routes',
            },
        ),
        migrations.CreateModel(
            name='Shuttle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'shuttle',
                'verbose_name_plural': 'shuttles',
            },
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company', models.CharField(max_length=50)),
                ('number', models.CharField(max_length=50)),
                ('kind', models.CharField(max_length=50)),
                ('capacity', models.IntegerField()),
                ('isAda', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'vehicle',
                'verbose_name_plural': 'vehicle',
            },
        ),
        migrations.CreateModel(
            name='ShuttleDate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trackerapp.Date')),
                ('shuttle', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trackerapp.Shuttle')),
            ],
            options={
                'verbose_name': 'shuttledate',
                'verbose_name_plural': 'shuttledates',
            },
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trackerapp.Route')),
            ],
            options={
                'verbose_name': 'place',
                'verbose_name_plural': 'places',
            },
        ),
        migrations.CreateModel(
            name='Entry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.TimeField()),
                ('attendee_count', models.IntegerField()),
                ('vehicle_number', models.CharField(max_length=50)),
                ('date', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trackerapp.Date')),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trackerapp.Place')),
                ('shuttle', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trackerapp.Shuttle')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'entry',
                'verbose_name_plural': 'entries',
            },
        ),
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('date', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trackerapp.Date')),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trackerapp.Driver')),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trackerapp.Route')),
                ('vehicle', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trackerapp.Vehicle')),
            ],
            options={
                'verbose_name': 'assignment',
                'verbose_name_plural': 'assignments',
            },
        ),
    ]