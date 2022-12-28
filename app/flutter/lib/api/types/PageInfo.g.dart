// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'PageInfo.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PageInfo _$PageInfoFromJson(Map<String, dynamic> json) => PageInfo(
      updating: json['updating'] as bool,
      next: json['next'] as bool,
      limit: json['limit'] as int,
      total: json['total'] as int,
      after: json['after'] as String?,
    );

Map<String, dynamic> _$PageInfoToJson(PageInfo instance) => <String, dynamic>{
      'updating': instance.updating,
      'next': instance.next,
      'limit': instance.limit,
      'total': instance.total,
      'after': instance.after,
    };
