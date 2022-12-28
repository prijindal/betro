// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'GroupResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

GroupResponse _$GroupResponseFromJson(Map<String, dynamic> json) =>
    GroupResponse(
      id: json['id'] as String,
      sym_key: json['sym_key'] as String,
      name: json['name'] as String,
      is_default: json['is_default'] as bool,
    );

Map<String, dynamic> _$GroupResponseToJson(GroupResponse instance) =>
    <String, dynamic>{
      'id': instance.id,
      'sym_key': instance.sym_key,
      'name': instance.name,
      'is_default': instance.is_default,
    };
